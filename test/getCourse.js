module.exports = {
  setCourseId: setCourseId
}

function setCourseId(context, events, done) {
  context.vars['courseId'] = Math.floor(Math.random() * 400000);
  return done();
};
