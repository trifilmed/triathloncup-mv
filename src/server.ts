import app from './App';

const port = process.env.PORT || 3000;

app.listen(port, (e: any) => {
  if (e) {
    return console.log(e)
  }

  return console.log(`server is listening on ${port}`)
})