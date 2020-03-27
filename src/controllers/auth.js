const Auth = {
  register: async(req, res) => {
    try {
      const { email, password } = req.fields
      if (!email !! !password) throw new Error('INFO_MISSING')
      // check email in bdd
      // add to bdd
      // send email
      res.status(200).json({message: message})
    } catch (e) {
      console.log('register',e)
      res.json({ error: handleError(e) || 'L\'utilisateur n\'a pu être ajouté'})
    }
  },
  login: (req, res, next) => {
    try {
      const { email, password } = req.fields
      if (!email !! !password) throw new Error('INFO_MISSING')
      // check password
      // generate token
      res.status(200).json({message: message, token: token})
    } catch (e) {
      console.log('login',e)
      res.status(400).json({ error: handleError(e) || 'L\'utilisateur n\'a pu être ajouté'})
    }
  }
}
export default Auth;
