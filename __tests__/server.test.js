'use strict';

const e = require('express');
const { app } = require('../src/server.js');
const supertest = require('supertest');

const mockRequest = supertest(app);

describe('API Server', () => {

  it('should repond with a 404 on a invalid route', async () => {
    let response = await mockRequest.get('/foo');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Not Found');
  });

  it('should respond with a 500 when the server has an error', async () => {
    let response = await mockRequest.get('/broken');
    expect(response.status).toBe(500);
  });

  it('should respond with a 200 for the / route', async () => {
    let response = await mockRequest.get('/');
    expect(response.status).toBe(200);
  });

  it('should respond with a "Hello World" for the / route', async () => {
    let response = await mockRequest.get('/');
    expect(response.text).toBe('Hello World');
  });


  it('should respond with an object with the given name for the /person route', async () => {
    let response = await mockRequest.get('/person?name=Bob');
    expect(response.body.name).toBe("Bob");
  });

  it('should respond with a 200 status for the person route with a given name', async () => {
    let response = await mockRequest.get('/person?name=Bob');
    expect(response.status).toBe(200);
  });

  it('should respond with an object for the person route with a given name', async () => {
    let response = await mockRequest.get('/person?name=Bob');
    expect(response.body.name).toBeDefined();
  });

  it('should respond with a 500 status for blank name request', async () => {
    let response = await mockRequest.get('/person/');
    expect(response.status).toBe(500);
  });

  it('should respond with Please provide a name error for blank name request', async () => {
    let response = await mockRequest.get('/person?name');
    expect(JSON.parse(response.text).error).toBe("Please provide a name");
  });


})