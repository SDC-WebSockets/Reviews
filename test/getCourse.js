module.exports = {
  setCourseId: setCourseId
}

function setCourseId(context, events, done) {
  context.vars['courseId'] = Math.floor(Math.random() * 1000001);
  return done();
};
