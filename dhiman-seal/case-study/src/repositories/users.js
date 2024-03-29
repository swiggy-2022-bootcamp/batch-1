import fs from 'fs/promises';

import UserData from '../models/user_data.js';

/**
 * Path to the Users database.
 */
const usersDBPath = './src/database/users.json';

/**
 * Creates (Registers) a new user in the json database.
 * @param {UserData} userData - The data of the user to be created.
 * @param {string} dbPathOverride - Override of the path to the
 * database to be used. Defaults to the default defined path usersDBPath.
 * @return {Promise<boolean>} A promise that resolves to whether the
 * user was successfully created.
 * @throws {Error} If credentials are invalid or the username already exists.
 */
export const createUser = async (userData, dbPathOverride=usersDBPath) => {
  const users = await getDatabase(dbPathOverride);
  if (userData.username.length === 0 || userData.password.length === 0) {
    throw invalidUserCredentialsError();
  }
  if (users[userData.username]) {
    throw alreadyExistsError(userData.username);
  }
  users[userData.username] = userData.toJSON();
  fs.writeFile(dbPathOverride, JSON.stringify(users));
  return true;
};

/**
 * Fetches the data of an existing user in the json database.
 * @param {string} username - The username of the user to be fetched.
 * @param {string} dbPathOverride - Override of the path to the
 * database to be used. Defaults to the default defined path usersDBPath.
 * @return {Promise<UserData>} A promise that resolves to data of fetched user.
 */
export const getUser = async (username, dbPathOverride=usersDBPath) => {
  const users = await getDatabase(dbPathOverride);
  return users[username] ? UserData.fromJSON(users[username]) : undefined;
};

/**
 * Updates the data of an existing user in the json database.
 * @param {string} username - Username of the user to be updated. Unchangeable.
 * @param {UserData} userData - Updated data of the user.
 * userData.username is ignored.
 * @param {string} dbPathOverride - Override of the path to the
 * database to be used. Defaults to the default defined path usersDBPath.
 * @return {Promise<boolean>} A promise that resolves to whether the
 * user was successfully updated.
 * @throws {Error} If credentials are invalid or username doesn't already exist.
 */
export const updateUser = async (
    username,
    userData,
    dbPathOverride=usersDBPath,
) => {
  const users = await getDatabase(dbPathOverride);
  if (username.length === 0) {
    throw invalidUserCredentialsError();
  }
  if (!users[username]) {
    throw doesNotExistError(username);
  }
  users[username] = {
    ...userData.toJSON(),
    username: username,
  };
  fs.writeFile(dbPathOverride, JSON.stringify(users));
  return true;
};

/**
 * Deletes an user completely from the database if they exist.
 * @param {string} username - of the user to be deleted.
 * @param {string} dbPathOverride - Override of the path to the
 * database to be used. Defaults to the default defined path usersDBPath.
 * @return {Promise<void>} A promise that resolves when the user is deleted.
 * @throws {Error} If credentials are invalid or username doesn't already exist.
 */
export const deleteUser = async (username, dbPathOverride=usersDBPath) => {
  const users = await getDatabase(dbPathOverride);
  if (!users[username]) {
    throw doesNotExistError(username);
  }
  delete users[username];
  fs.writeFile(dbPathOverride, JSON.stringify(users));
};

/**
 * Returns a database object as an asynchronous promise.
 * @param {string} dbPath - The path of the database to be fetched.
 * @param {string} dbPathOverride - Override of the path to the
 * database to be used. Defaults to the default defined path usersDBPath.
 * @return {Promise<object>} A promise that resolves to the database json.
 */
const getDatabase = async (dbPath=usersDBPath) =>
  JSON.parse(await fs.readFile(dbPath, 'utf-8'));

/**
 * Creates error that is thrown when User data is invalid.
 * @return {Error} An error object for invalid User data.
 */
const invalidUserCredentialsError = () =>
  new Error('username and password are required.');

/**
 * Creates error that is thrown when the User corresponding to the username
 * already exists.
 * @param {string} username - ID of the question that already exists.
 * @return {Error} An error object for already existing Users.
 */
const alreadyExistsError = (username) =>
  new Error(`User with username ${username} already exists.`);

/**
 * Creates error that is thrown when the User corresponding to the username
 * does not exist.
 * @param {string} username - ID of the question that does not exist.
 * @return {Error} An error object for non-existing Users.
 */
const doesNotExistError = (username) =>
  new Error(`User with username ${username} doesn't exist.`);

