import { Schema, model, models } from 'mongoose';

const AtharvaSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        recipient: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        property: {
            type: Schema.Types.ObjectId,
            ref: 'Property',
            required: true,
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
        },
        phone: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^[0-9]{10}$/.test(v); // Ensures valid 10-digit phone numbers
                },
                message: props => `${props.value} is not a valid phone number!`,
            }
        },
        body: {
            type: String,
            maxlength: [1000, 'Message body cannot exceed 1000 characters'],
        },
        read: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Optional index for better query performance
AtharvaSchema.index({ recipient: 1, read: 1 });

const Atharva = models.Atharva || model('Atharva', AtharvaSchema);

export default Atharva;
