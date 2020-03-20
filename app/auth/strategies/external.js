/**
 * External class.
 */
class External {
  /**
    * Check the given credentials.
    *
    * @param   {string}  email
    * @param   {string}  password
    *
    * @return  {string}
    */
  async checkCredentials(email, password) {
    try {
      const response = await container.axios.post(container.config.auth_gateway, {email: email, password: password});
      const userObject = await container.userRepository.first({hr_id: response.data.data.id});
      if (!userObject) {
        const error = new Error();
        error.statusCode = 401;
        return error;
      }
      return userObject;
    } catch (error) {
      return false;
    }
  }
}

module.exports = External;
