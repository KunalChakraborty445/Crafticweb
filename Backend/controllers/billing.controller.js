import { PLANS } from "../config/plan.js";
import stripe from "../config/stripe.js";

export const billingController = async (req, res) => {
    try {
        const { planType } = req.body;
        const userId = req.user?._id;
        const planKey = planType?.toString().toLowerCase();
        const plan = PLANS[planKey];
        if (!plan || (plan.price === 0 && plan.plan !== 'free')) {
            return res.status(400).json({ success: false, message: "Invalid paid plan" })
        }

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data:{
                        currency: "inr",
                        product_data:{
                            name: `CrafticWeb.ai ${planType.toUpperCase()} Plan`
                        },
                        unit_amount: plan.price * 100,
                    },
                    quantity: 1
                }
            ],

            metadata:{
                userId: userId.toString(),
                credits: plan.credits,
                plan: plan.plan
            },
            success_url: `${process.env.FRONTEND_URL}/`,
            cancel_url: `${process.env.FRONTEND_URL}/pricing`
        })

        return res.status(200)
        .json(
            {success: true,
             sessionUrl: session.url
            })
    }catch (error) {
        console.error("Error creating checkout session:", error);
        console.log(error);
        
        res.status(500).json({ success: false, message: "Error creating checkout session" });
    }
}