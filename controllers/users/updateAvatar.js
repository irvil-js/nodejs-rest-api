const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')
const { HTTP_CODS } = require('../../helpers/constants')

const { User } = require('../../model/schemas/user')

const imageDir = path.join(__dirname, '../../', 'public/avatars')

const updateAvatar = async (req, res) => {
  const id = req.user._id
  const { path: tempPath, originalname } = req.file
  let uploadPath = path.join(imageDir, id.toString())
  try {
    await fs.mkdir(uploadPath, { recursive: true })
  } catch (err) {
    if (err) {
      if (err.code !== 'EEXIST') {
        throw err
      }
    }
  }
  uploadPath = path.join(uploadPath, originalname)
  const avatar = `/avatars/${id}/${originalname}`
  try {
    const file = await Jimp.read(tempPath)
    await file.resize(255, 255).write(tempPath)
    await fs.rename(tempPath, uploadPath)
    await User.findByIdAndUpdate({ _id: id }, { avatarURL: avatar })
  } catch (error) {
    await fs.unlink(tempPath)
    throw error
  }

  res.status(HTTP_CODS.OK)
    .json({
      status: 'success',
      message: 'update avatar',
      data: {
        result: avatar
      }
    })
}

module.exports = updateAvatar
