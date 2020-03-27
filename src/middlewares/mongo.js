import mongoose from 'mongoose';

mongoose.connect(process.env.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, (err, data) => {
  if (err) console.log(err);
  else     console.log('MongoDB connected !');
})
