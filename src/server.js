import express from 'express'


const PORT = process.env.PORT || 5000
const app = express()



import studentRouter from './routers/student.js'
import groupsRouter from './routers/groups.js'
import studentGr from  './routers/studentGr.js'

app.use( express.json() )


app.use(studentRouter)
app.use(groupsRouter)
app.use(studentGr)




app.use((error, req, res, next) => {
    if(error.status != 500){
        return res.status(error.status).json({
            status: error.status,
            message: error.message
        })
    }
    
    

    res.status(error.status).json({
        status: error.status,
        message: 'InternalServerError'
    })

    process.exit()
    

})

app.listen(PORT , () => console.log(`server run on http://localhost:${PORT}`))