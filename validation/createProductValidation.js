export default function validateCreateProduct(values) {
  let errors = {}
  // const validateEmailRegex =
  // const validateURLRegex = !/^(ftp|http|https):\/\/[^ "]+$/
  //validate name
  if (!values.name) {
    errors.name = 'Name is required'
  }

  if (!values.company) {
    errors.company = 'Company is required'
  }

  if (!values.url) {
    errors.url = 'URL is required'
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = 'URL is invalid'
  }

  if (!values.description) {
    errors.description = 'Description is required'
  }

  return errors
}
