const clipboardy = require('clipboardy');
const axios = require('axios');
const prompt = require('prompt');

const promptAttributes = [
  { name: 'filename', description: 'please enter file name for gist' },
  {
    name: 'description',
    description: 'please write a short description for the gist'
  }
];
const getClipboardContents = () => {
  return clipboardy.readSync();
};

const setClipBoardContents = (content) => {
  clipboardy.writeSync(content);
};

const getDataObjForGist = (privacy, description, filename, contents) => {
  return {
    public: privacy,
    description: description,
    filename: filename,
    content: contents
  };
};

async function getFileNameDescription(calllback) {
  await prompt.start();
  await prompt.get(promptAttributes, (err, result) => {
    if (err) {
      console.log(err);
      return 1;
    }
    calllback(result);
  });
}

const prepareGistforCreation = (result) => {
  const { filename, description } = result;

  const dataObj = getDataObjForGist(
    false,
    description,
    filename,
    getClipboardContents()
  );
  postCreateGist(dataObj);
};

getFileNameDescription(prepareGistforCreation);

function postCreateGist(dataObj) {
  axios({
    method: 'post',
    url: 'https://api.github.com/gists',
    headers: { Authorization: `Bearer ${access_token}` },
    data: {
      public: dataObj.public,
      description: dataObj.description,
      files: {
        [`${dataObj.filename}`]: {
          content: `${dataObj.content}`
        }
      }
    }
  }).then(function (response) {
    console.log(
      `✔Gist posted successfully!\nView at: ${response.data.html_url}`
    );
    setClipBoardContents(response.data.html_url);
  });
}

/* console.log(
  getDataObjForGist(false, 'sample test', 'test.js', 'this is a simple test')
);
 */
