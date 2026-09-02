export default function getPublicIdFromCloudinaryUrl(url) {
  const parts = url.split('/upload/')
  if (parts.length < 2) return null

  let path = parts[1]

  path = path.replace(/^v\d+\//, '')

  const segments = path.split('/');
  if (segments[0].match(/[a-z]_[a-zA-Z0-9]/)) {
    segments.shift()
  }
  path = segments.join('/')

  const publicId = path.replace(/\.[^/.]+$/, '')

  return publicId
}