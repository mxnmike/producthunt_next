export default function validateLogin(values) {
  let errors = {}
  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid Email'
  }
  if (!values.password) {
    errors.password = 'Password is required'
  }
  return errors
}
