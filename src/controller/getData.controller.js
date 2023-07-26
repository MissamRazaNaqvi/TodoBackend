const mysqlConnection = require('../config/dbConfig');
const jwt = require('jsonwebtoken');

module.exports.getData = (req, res) => {
    let getAlldata = ' SELECT * FROM todolist';
    mysqlConnection.query(getAlldata, (err, rows, fields) => {
        if (err) {
            console.log('error');
        }
        else {
            res.send(rows);
        }
    })
}
module.exports.addData = (req, res) => {
    let { titleAdd, DescriptionAdd, token } = req.body
    const { userid } = jwt.verify(token, process.env.DB_TOKEN)
    let quary = `INSERT INTO todolist set title=?,description=?, userid=?`
    mysqlConnection.query(quary, [titleAdd, DescriptionAdd, userid], (err, rows, fields) => {
        if (err) {
            console.log('error from insert', err);
        }
        else {
            console.log('record added successfully')
            res.send('record added successfully');
        }
    })
}
module.exports.deleteRecord = (req, res) => {
    // console.log(req.params)
    let id = req.params.id
    // console.log('id for delete record', id);
    let quary = `DELETE FROM todolist WHERE id = ?`
    mysqlConnection.query(quary, [id], (err, rows) => {
        if (err) {
            console.log('error from delete');
        } else {
            res.send('delete record successfully');
            console.log('delete record successfully');
        }
    })
}
module.exports.updateRecord = (req, res) => {
    let { isUpdate, titleUpdate, DescriptionUpdate } = req.body
    // console.log('data for update', req.body)
    let quary = 'UPDATE todolist SET  title=?,description=? WHERE id=?'
    mysqlConnection.query(quary, [titleUpdate, DescriptionUpdate, isUpdate], (err, rows) => {
        if (err) {
            console.log('error from update');
        } else {
            res.send('update record successfully');
            console.log('update record successfully');
        }
    })
}
module.exports.register = (req, res) => {
    let { firstname, username, password } = req.body
    let quary = 'INSERT INTO user SET firstname=?, username=?, password=?'
    mysqlConnection.query(quary, [firstname, username, password], (err, rows) => {
        if (err) {
            console.log('error in user registration')
        }
        else {
            console.log('user register successfully')
        }
    })
}
module.exports.login = (req, res) => {
    let { username, password } = req.body;
    console.log(username, password);
    let quary = 'SELECT userid , username , password FROM user WHERE username=? AND password=? '
    mysqlConnection.query(quary, [username, password], (err, rows) => {
        if (err) {
            res.send('username and password is invalid')
            console.log('username and password is invalid')
        }
        else {
            if (rows.length === 1) {
                const token = jwt.sign({ userid: rows[0].userid }, process.env.DB_TOKEN);
                // console.log(decode = jwt.verify(token, process.env.DB_TOKEN));
                res.send([{ credential: 'success' }, { token: token }])
            } else {
                res.send([{ credential: 'failed' }])
            }
        }
    })
}
module.exports.getUserData = (req, res) => {
    let { token } = req.body
    const decode = jwt.verify(token, process.env.DB_TOKEN)
    let sql = 'select todolist.id, todolist.title , todolist.description from user join todolist on user.userid=todolist.userid where user.userid=?'
    mysqlConnection.query(sql, [decode.userid], (err, rows) => {
        if (err) {
            console.log('error data not found', err)
        } else {
            res.send(rows)
            console.log(rows)
        }
    })
}
module.exports.verifyUser = (req, res) => {
    let { token } = req.body
    const { userid } = jwt.verify(token, process.env.DB_TOKEN)
    let quary = 'SELECT  username  FROM user WHERE userid=?  '
    mysqlConnection.query(quary, [userid], (error, rows) => {
        if (error) {
            res.send({ success: false, error: error })
            console.log('user not found')
        }
        else {
            res.send({ success: true })
            console.log('user found')
        }
    })
}
