const getImgUrl = (pic) => {
  if (!pic) {
    return null
  }
  return require('@/assets/' + pic)
}

export default getImgUrl
