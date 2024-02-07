import HTTPClient from "./HTTPClient.js";

const API_BASE = "/api";

export default {
  getCurrentUser: () => {
    return HTTPClient.get(API_BASE + "/users/current");
  },
  logIn: (email, password) => {
    let data = {
      email: email,
      password: password,
    };
    return HTTPClient.post(API_BASE + "/login", data);
  },

  logOut: () => {
    return HTTPClient.post(API_BASE + "/logout", {});
  },

  register: (email, password) => {
    let data = {
      email: email,
      password: password,
    };
    return HTTPClient.post(API_BASE + "/register", data);
  },

  createStudyset: (title) => {
    let url =
      API_BASE + "/courses/" + sessionStorage.getItem("course") + "/studysets";
    let data = {
      title: title,
    };
    return HTTPClient.post(url, data);
  },

  deleteStudyset: (id) => {
    let url =
      API_BASE +
      "/courses/" +
      sessionStorage.getItem("course") +
      "/studysets/" +
      id;
    return HTTPClient.delete(url);
  },

  updateStudyset: (id, title) => {
    let url =
      API_BASE + "/courses/" + sessionStorage.getItem("course") + "/studysets";
    let data = {
      id: id,
      title: title,
    };
    return HTTPClient.put(url, data);
  },

  createForumPost: (question) => {
    let url =
      API_BASE + "/courses/" + sessionStorage.getItem("course") + "/forumPosts";
    let data = {
      question: question,
    };
    return HTTPClient.post(url, data);
  },

  deleteForumPost: (id) => {
    let url =
      API_BASE +
      "/courses/" +
      sessionStorage.getItem("course") +
      "/forumPosts/" +
      id;
    return HTTPClient.delete(url);
  },

  updateForumPost: (id, question) => {
    let url =
      API_BASE + "/courses/" + sessionStorage.getItem("course") + "/forumPosts";
    let data = {
      id: id,
      question: question,
    };
    console.log(id);
    console.log(question);
    return HTTPClient.put(url, data);
  },

  createForumReply: (replyMessage) => {
    let url =
      API_BASE +
      "/courses/" +
      sessionStorage.getItem("course") +
      "/forumPosts/" +
      sessionStorage.getItem("post") +
      "/replies";
    let data = {
      body: replyMessage,
    };
    return HTTPClient.post(url, data);
  },

  deleteForumReply: (id) => {
    let url =
      API_BASE +
      "/courses/" +
      sessionStorage.getItem("course") +
      "/forumPosts/" +
      sessionStorage.getItem("post") +
      "/replies/" +
      id;
    console.log(url);
    return HTTPClient.delete(url);
  },

  updateForumReply: (id, replyMessage) => {
    let url =
      API_BASE +
      "/courses/" +
      sessionStorage.getItem("course") +
      "/forumPosts/" +
      sessionStorage.getItem("post") +
      "/replies/";
    let data = {
      id: id,
      reply: replyMessage
    };
    return HTTPClient.put(url, data);
  },

  createFlashcard: (flashcard) => {
    let url =
      "/api/courses/" +
      sessionStorage.getItem("course") +
      "/studysets/" +
      sessionStorage.getItem("studyset") +
      "/flashcards";
    console.log(url);
    console.log(flashcard);
    return HTTPClient.post(url, flashcard);
  },

  deleteFlashcard: (id) => {
    let url =
      API_BASE +
      "/courses/" +
      sessionStorage.getItem("course") +
      "/studysets/" +
      sessionStorage.getItem("course") +
      "/flashcards/" +
      id;
    return HTTPClient.delete(url);
  },

  updateFlashcard: (id, question, answer) => {
    let url =
      API_BASE +
      "/courses/" +
      sessionStorage.getItem("course") +
      "/studysets/" +
      sessionStorage.getItem("course") +
      "/flashcards/";
    let data = {
      id: id,
      question: question,
      answer: answer,
    };
    return HTTPClient.put(url, data);
  },
};
