import stripe from "../config/stripe.js";
import User from "../models/user.model.js";

export const stripeWebhookController = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event =  stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        console.error("Error constructing webhook event:", error);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    if(event.type === "checkout.session.completed"){
        const session = event.data.object;
        const userId = session.metadata.userId;
        const credits = Number(session.metadata.credits);
        const plan = session.metadata.plan;

        await User.findByIdAndUpdate(userId,{
            $inc: {credits: credits},
            plan: plan
        })
    }

    res.status(200).json(
        {received: true}
    )
}