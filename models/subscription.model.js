import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "subscription name is required"],
      minLength: 2,
      maxLength: 50,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "subscription price must be greate"],
    },
    currency: {
      type: String,
      enum: ["USD", "EURO", "INR"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: true,
    },
    category: {
      type: String,
      enum: ["entertainment", "sports", "lifestyle", "wrestling"],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "expired"],
      required: true,
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => {
          return value <= new Date();
        },
        message: "start date must be in past",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
          validator: function (value) {
              return value > this.startDate;
          },
        message: "start date must be in future",
      },
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true, 
            index : true 
    }
  },
  { timestamps: true }
);

subscriptionSchema.pre("save", function (next) {
    if (!this.renewalDate) {

        const renewalPeriod = {
            daily: 1, 
            weekly: 7, 
            monthly: 30, 
            yearly : 365
        }
        
        this.renewalDate = new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency])
    }

    if (this.renewalDate < new Date) {
        this.status = "expired "
    }

    next()  
})

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
