import "./config.mjs";
import mongoose from 'mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';

const { Schema } = mongoose;

mongoose.connect(process.env.DSN);

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
});

const ArticleSchema = new mongoose.Schema({
  title: {type: String, required: true},
  url: {type: String, required: true},
  description: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User'}

}, {timestamps: true});

UserSchema.plugin(mongooseSlugPlugin, {tmpl: '<%=username%>'});
ArticleSchema.plugin(mongooseSlugPlugin, {tmpl: '<%=title%>'});

mongoose.model('User', UserSchema);
mongoose.model('Article', ArticleSchema);



