const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

// POSTGRES CONNECTION
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "vibely",
  password: "2103",
  port: 5432,
});

const app = express();

app.use(cors());

// HTTP MAX FILE SIZE
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// SIGN UP REQUEST
app.post("/api/signup", async (req, res) => {
  const { username, first_name, last_name, password, email, created_date } =
    req.body;
  if (username && first_name && email && password) {
    try {
      const client = await pool.connect();
      const query = await client.query(
        "SELECT username FROM user_tbl WHERE username =$1",
        [username]
      );
      client.release();
      if (!query.rows.length > 0) {
        const client = await pool.connect();
        await client.query(
          "INSERT INTO user_tbl (username, password, email, first_name, last_name, created_date)" +
            "values ($1, $2, $3, $4, $5, $6)",
          [username, password, email, first_name, last_name, created_date]
        );
        client.release();
        res.status(201).json("Your account has been created. Welcome!");
      } else {
        res.status(409).json("Username is already taken.");
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(404).json("Empty input");
  }
});

// SIGN IN REQUEST
app.post("/api/signin", async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "SELECT username, password FROM user_tbl WHERE username =$1",
        [username]
      );
      if (result.rows.length > 0) {
        if (result.rows[0].password === password) {
          res.status(200).json("Signed in, welcome back!");
        } else {
          res.status(401).json("Password is not correct!");
        }
      } else {
        res.status(404).json("User not exist!");
      }
      client.release();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(404).json("Empty input");
  }
});

// UPDATE PHOTO POST
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.post(
  "/api/profile/update/picture",
  upload.single("file"),
  async function (req, res, next) {
    const file = req.file;
    const { username, password } = req.body;
    if (!file) {
      res.status(404).json("No file");
      return;
    }
    const buffer = file.buffer;
    const client = await pool.connect();
    try {
      await client.query({
        text: "UPDATE user_tbl SET picture = $1 WHERE username = $2 AND password = $3",
        values: [buffer, username, password],
      });
      res.status(200).json("Picture updated successfully.");
    } catch (error) {
      res.status(400).json(error);
    } finally {
      client.release();
    }
  }
);

// GET USER INFORMATION
app.get("/api/profile/information", async (req, res) => {
  const { userVisited, userSigned } = req.query;
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM user_tbl WHERE username = $1",
      [userVisited]
    );
    const isFollowing = await client.query(
      "SELECT * FROM follow_tbl WHERE follower = $1 AND following = $2",
      [userSigned, userVisited]
    );
    const responseData = {
      first_name: result.rows[0].first_name,
      last_name: result.rows[0].last_name,
      post_count: result.rows[0].post_count,
      followers_count: result.rows[0].followers_count,
      following_count: result.rows[0].following_count,
      biography: result.rows[0].biography,
      picture: result.rows[0].picture,
      isFollowing: isFollowing.rows.length > 0 ? true : false,
    };
    if (result.rows.length > 0) {
      res.send(responseData);
    } else {
      res.status(404).json("User not found");
    }
    client.release();
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// FOLLOW USER
app.post("/api/user/follow", async (req, res) => {
  const { follower, password, following } = req.body;

  if (follower && password && following) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "SELECT username, password FROM user_tbl WHERE username =$1",
        [follower]
      );
      if (result.rows.length > 0) {
        if (result.rows[0].password === password) {
          await client.query(
            "INSERT INTO follow_tbl (follower, following, follow_time) " +
              " VALUES ($1, $2, $3)",
            [follower, following, new Date()]
          );
          await client.query(
            "UPDATE user_tbl SET following = following+1 WHERE username = $1",
            [follower]
          );
          await client.query(
            "UPDATE user_tbl SET followers = followers+1 WHERE username = $1",
            [following]
          );
          res.status(200).json("Followed successfully");
        } else {
          res.status(401).json("Password is not correct!");
        }
      } else {
        res.status(404).json("User not exist!");
      }
      client.release();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(404).json("Empty input");
  }
});

// UNFOLLOW USER
app.post("/api/user/unfollow", async (req, res) => {
  const { follower, password, following } = req.body;

  if (follower && password && following) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "SELECT username, password FROM user_tbl WHERE username =$1",
        [follower]
      );
      if (result.rows.length > 0) {
        if (result.rows[0].password === password) {
          await client.query(
            "DELETE FROM follow_tbl WHERE follower=$1 AND following=$2",
            [follower, following]
          );
          await client.query(
            "UPDATE user_tbl SET following = following-1 WHERE user_name = $1",
            [follower]
          );
          await client.query(
            "UPDATE user_tbl SET followers = followers-1 WHERE user_name = $1",
            [following]
          );
          res.status(200).json("Unfollowed successfully");
        } else {
          res.status(401).json("Password is not correct!");
        }
      } else {
        res.status(404).json("User not exist!");
      }
      client.release();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(404).json("Empty input");
  }
});

//SHARE POST
app.post("/api/share-post", async (req, res) => {
  const { user_name, password, description, picture } = req.body;
  if (user_name && password && (description || picture)) {
    try {
      const client = await pool.connect();
      const query = await client.query(
        "SELECT username FROM user_tbl WHERE user_name =$1 AND password =$2",
        [user_name, password]
      );
      client.release();
      if (query.rows.length > 0) {
        const client = await pool.connect();
        await client.query(
          "INSERT INTO post_tbl (user_shared, description, picture, shared_time)" +
            "values ($1, $2, $3, $4)",
          [user_name, description, picture, new Date()]
        );
        await client.query(
          "UPDATE user_tbl SET posts = posts + 1 WHERE username = $1",
          [user_name]
        );
        client.release();
        res.status(201).json("Post shared.");
      } else {
        res.status(409).json("Username or password is wrong.");
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(404).json("Empty Value");
  }
});

// GET POST FLOW
app.get("/api/post-flow", async (req, res) => {
  const { userSigned, password } = req.query;
  const client = await pool.connect();
  const result = await client.query(
    `
    SELECT user_name, password FROM user_tbl 
    WHERE user_name = $1 AND password = $2
    `,
    [userSigned, password]
  );
  if (result.rows.length > 0) {
    const sqlQuery = `
    SELECT DISTINCT user_name, user_tbl.picture as profilePicture,
     post_tbl.id as id, user_shared, description,
     post_tbl.picture as postPicture, shared_time
    FROM post_tbl, user_tbl, follow_tbl 
    WHERE user_shared = user_name 
	  AND user_name = follow_tbl.following
    AND (follow_tbl.follower = $1 OR post_tbl.user_shared = $1)
    AND post_tbl.deleted = 'false'
  `;
    try {
      const result = await client.query(sqlQuery, [userSigned]);

      if (result.rows.length > 0) {
        res.send(result.rows);
      } else {
        res.send("No post flow");
      }
      client.release();
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else {
    res.status(401).json("Password is wrong");
  }
});

app.get("/api/user-post-flow", async (req, res) => {
  const { userSigned, password, userVisited } = req.query;
  const client = await pool.connect();
  const result = await client.query(
    `
    SELECT user_name, password FROM user_tbl 
    WHERE user_name = $1 AND password = $2
    `,
    [userSigned, password]
  );
  if (result.rows.length > 0) {
    const sqlQuery = `
    SELECT DISTINCT user_name, user_tbl.picture as profilePicture,
     post_tbl.id as id, user_shared, description,
     post_tbl.picture as postPicture, shared_time
    FROM post_tbl, user_tbl 
    WHERE user_shared = user_name
	  AND post_tbl.user_shared = $1
    AND post_tbl.deleted = 'false'
  `;
    try {
      const result = await client.query(sqlQuery, [userVisited]);

      if (result.rows.length > 0) {
        res.send(result.rows);
      } else {
        res.send("No post flow");
      }
      client.release();
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else {
    res.status(401).json("Password is wrong");
  }
});

app.listen(8055, () => {
  console.log("Server is running...");
});
