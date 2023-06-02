const mysqlConnection = require('../config/dbConfig');
const jwt = require('jsonwebtoken');
const { json } = require('express');

module.exports.getData = (req, res) => {
    // let { token } = req.body
    // try {
    //     const decode = jwt.verify(token, process.env.DB_TOKEN)
    //     console.log('decoded user token : ', decode);
    //     res.json({
    //         success: true
    //     })
    // }
    // catch (error) {
    //     res.json({
    //         success: false,
    //         error: error
    //     })
    // }
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
    let data = req.body
    // console.log(data)
    let quary = `INSERT INTO todolist set title=?,description=?`
    mysqlConnection.query(quary, [data.titleAdd, data.DescriptionAdd], (err, rows, fields) => {
        if (err) {
            console.log('error from insert');
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
    console.log('data for update', req.body)
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
    // console.log(username, password);
    let quary = 'SELECT userid , username , password FROM user WHERE username=? AND password=? '
    mysqlConnection.query(quary, [username, password], (err, rows) => {
        if (err) {
            res.send('username and password is invalid')
            console.log('username and password is invalid')
        }
        else {
            // console.log(rows.length);
            if (rows.length === 1) {
                const userid = rows[0].userid;
                // console.log('userid id ', userid)
                const token = jwt.sign(
                    {
                        userid: rows[0].userid,
                    },
                    process.env.DB_TOKEN
                );
                console.log();
                const decode = jwt.verify(token, process.env.DB_TOKEN)
                console.log('decode token userid ', decode.userid)
                let sql = 'select todolist.title , todolist.description from user join todolist on user.userid=todolist.userid where user.userid=?'
                mysqlConnection.query(sql, [userid], (err, rows) => {
                    if (err) {
                        console.log('error data not found', err)
                    } else {
                        // console.log(rows)
                        res.send([{ rows }, { token: token }, { success: 'loginsuccess' }])
                        // res.send({ success: 'loginSuccess', row: `${json.toString(rows)}`, token: `${token}` });
                    }
                })
            } else {
                res.send({ fail: 'login failed' })
            }
        }
    })
}