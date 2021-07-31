module.exports = {
  setCourseId: setCourseId,
  getJSONfields: getJSONfields
}

function setCourseId(context, events, done) {
  context.vars['courseId'] = Math.floor(Math.random() * 1000001);
  return done();
};

const randomInclusiveInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const commentOptions = [
  "Numquam exercitationem doloremque beatae necessitatibus quasi.<br>Fugiat id fugit sint nisi voluptas sed nobis molestiae eum.",
  "quia non sed",
  "Quo enim et officiis et incidunt voluptatem dolorum odit perspiciatis.<br>Sed ipsa iste odit voluptate ipsam nulla aut dolor distinctio.<br>Repellat asperiores quo temporibus itaque nesciunt.<br>Porro qui ipsa fugit quo beatae non aut.<br>Porro ad impedit minima magnam ea culpa illo.",
  "at",
  "Perferendis et accusantium rerum nam doloremque natus sit. Perferendis consequatur veniam neque qui nam voluptas quasi qui. Omnis facere veniam ad. Nobis excepturi maiores ducimus fugiat neque in illum qui aut. Rerum sequi rerum. Natus officia aspernatur assumenda non tempora eos non voluptas consequatur.",
  "Reprehenderit rerum iure omnis voluptatem cumque placeat autem voluptatum et. A sint sit blanditiis. Nobis quaerat id et qui ducimus vitae.",
  "est ut nobis",
  "Quis in corrupti aperiam voluptas iste quam explicabo. Optio possimus a illum vel. Iure inventore totam voluptate repellat.",
  "Fugit quis ipsam in.",
  "Explicabo qui natus iusto deleniti porro quia rerum nobis.",
  "aut",
  "asperiores quo sapiente",
  "sint"
];
const createdAtOpts = [
  "2021-06-24T17:55:26.205Z",
  "2021-06-29T12:58:18.500Z",
  "2021-06-09T07:37:34.265Z",
  "2021-05-16T10:35:18.082Z",
  "2021-05-12T03:23:29.982Z",
  "2021-07-16T14:11:33.624Z",
  "2021-05-30T13:45:41.964Z",
  "2021-05-31T02:53:30.027Z",
  "2021-07-03T22:03:46.005Z",
  "2021-05-31T15:20:11.043Z",
  "2021-05-08T09:14:51.909Z",
  "2021-06-18T05:38:56.732Z"
];
const ratingOpts = [5, 5, 5, 5, 5, 5, 5, 5, 4.5, 4.5, 4, 4, 4, 3.5, 3, 2.5, 2, 1.5, 1, 1];
const reviewerIds = [
  "0a2a51dac6138826127f093500461d91",
  "3acb2a202ae4bea8840224e6fce16fd0",
  "b5c24ab1ddc1aecd658a6cd39eb2362d",
  "0dbd53751c00e0784799008b44471a77",
  "ac8a9143597891fc2fc2ded41a9a9ec7",
  "15e122e839dfdaa7ce969536f94aecf6",
  "f7a82ce7e16d9687e7cd9a9feb85d187",
  "64eec0c3fb6b12c43f51ec9e9c773fed",
  "003dd617c12d444ff9c80f717c3fa982",
  "58521e4e2bd3d4b988cbd17d7365df3c",
  "5dcd0ddd3d918c70d380d32bce4e733a",
  "49e863b146f3b5470ee222ee84669b1c",
  "45cef8e5b9570959bd9feaacae2bf38d"
];

function getJSONfields(context, events, done) {
  // make it likely to have a good rating
  const rating = ratingOpts[randomInclusiveInteger(0, ratingOpts.length - 1)];
  const comment = commentOptions[randomInclusiveInteger(0, commentOptions.length - 1)];
  const createdAt = createdAtOpts[randomInclusiveInteger(0, createdAtOpts.length - 1)];
  const helpful = randomInclusiveInteger(1, 50);
  const reviewer = reviewerIds[randomInclusiveInteger(0, reviewerIds.length - 1)];

  context.vars['rating'] = rating;
  context.vars['comment'] = comment;
  context.vars['createdAt'] = createdAt;
  context.vars['helpful'] = helpful;
  context.vars['reported'] = false;
  context.vars['reviewer'] = reviewer;

  return done();
};