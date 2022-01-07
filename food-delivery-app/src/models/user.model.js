const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const addressSchema = mongoose.Schema({
  city: String,
  street: String,
  houseNumber: String,
});

const userSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email address');
        }
      },
    },
    password: {
      type: String,
      minLength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            'Password must contain at least one letter and one number'
          );
        }
      },
    },
    walletMoney: {
      type: Number,
      required: true,
      default: config.default_wallet_money,
    },
    address: {
      type: addressSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isEmailTaken = async function (email) {
  try {
    const doesExist = await this.exists({ email });
    if (doesExist) return true;
    return false;
  } catch (error) {
    console.log(error.message);
  }
};

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.isPasswordMatch = async function (password) {
  if (await bcrypt.compare(password, this.password)) {
    return true;
  } else {
    return false;
  }
};

const User = mongoose.model('User', userSchema);
module.exports = {
  User,
};
