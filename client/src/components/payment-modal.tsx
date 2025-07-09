import { useState, useEffect } from "react";
import { useStripe, useElements, PaymentElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, CreditCard, Building, Smartphone } from "lucide-react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "");

interface PaymentModalProps {
  course: any;
  onClose: () => void;
  onSuccess: () => void;
}

function PaymentForm({ course, onSuccess }: { course: any; onSuccess: () => void }) {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const { toast } = useToast();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!course || paymentMethod !== "stripe") return;

    const createPaymentIntent = async () => {
      setIsLoading(true);
      try {
        const response = await apiRequest("POST", "/api/create-payment-intent", {
          amount: parseFloat(course.price),
          currency: "usd",
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to initialize payment",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [course, paymentMethod, toast]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (paymentMethod === "bank_transfer") {
      // Show bank transfer details
      toast({
        title: "Bank Transfer Details",
        description: "Please transfer to: Commercial Bank of Ethiopia - Account: 1000123456789",
        duration: 8000,
      });
      return;
    }

    if (paymentMethod === "telebirr") {
      // Show TeleBirr details
      toast({
        title: "TeleBirr Payment",
        description: "Please dial *127# and follow the prompts to pay.",
        duration: 8000,
      });
      return;
    }

    if (!stripe || !elements || !clientSecret) return;

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      toast({
        title: "Payment failed",
        description: error.message,
        variant: "destructive",
      });
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      toast({
        title: "Payment successful!",
        description: "You've been enrolled in the course.",
      });
      onSuccess();
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Method Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Choose Payment Method</h3>
        <div className="grid grid-cols-1 gap-3">
          <div 
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              paymentMethod === "stripe" ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setPaymentMethod("stripe")}
          >
            <div className="flex items-center space-x-3">
              <input 
                type="radio" 
                checked={paymentMethod === "stripe"} 
                onChange={() => setPaymentMethod("stripe")}
                className="text-purple-600"
              />
              <CreditCard className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <div className="font-medium">Credit/Debit Card</div>
                <div className="text-sm text-gray-600">Visa, Mastercard, American Express</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">${course.price}</div>
                <div className="text-xs text-gray-500">USD</div>
              </div>
            </div>
          </div>
          
          <div 
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              paymentMethod === "bank_transfer" ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setPaymentMethod("bank_transfer")}
          >
            <div className="flex items-center space-x-3">
              <input 
                type="radio" 
                checked={paymentMethod === "bank_transfer"} 
                onChange={() => setPaymentMethod("bank_transfer")}
                className="text-purple-600"
              />
              <Building className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <div className="font-medium">Bank Transfer</div>
                <div className="text-sm text-gray-600">Commercial Bank of Ethiopia</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">{course.priceEtb}</div>
                <div className="text-xs text-gray-500">ETB</div>
              </div>
            </div>
          </div>

          <div 
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              paymentMethod === "telebirr" ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setPaymentMethod("telebirr")}
          >
            <div className="flex items-center space-x-3">
              <input 
                type="radio" 
                checked={paymentMethod === "telebirr"} 
                onChange={() => setPaymentMethod("telebirr")}
                className="text-purple-600"
              />
              <Smartphone className="w-5 h-5 text-orange-600" />
              <div className="flex-1">
                <div className="font-medium">TeleBirr</div>
                <div className="text-sm text-gray-600">Mobile payment</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">{course.priceEtb}</div>
                <div className="text-xs text-gray-500">ETB</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      {paymentMethod === "stripe" && (
        <div className="border rounded-lg p-4">
          {clientSecret ? (
            <PaymentElement />
          ) : (
            <div className="flex justify-center p-4">
              <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>
      )}

      {paymentMethod === "bank_transfer" && (
        <div className="border rounded-lg p-4 bg-green-50">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Building className="w-5 h-5 text-green-600" />
            Bank Transfer Instructions
          </h4>
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div><strong>Bank:</strong></div>
              <div>Commercial Bank of Ethiopia</div>
              <div><strong>Account Name:</strong></div>
              <div>Talenta Education Platform</div>
              <div><strong>Account Number:</strong></div>
              <div>1000123456789</div>
              <div><strong>Amount:</strong></div>
              <div>{course.priceEtb} ETB</div>
              <div><strong>Reference:</strong></div>
              <div>Course-{course.id}</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Please include your email and course name in the transfer reference. 
              Your enrollment will be processed within 24 hours of payment confirmation.
            </p>
          </div>
        </div>
      )}

      {paymentMethod === "telebirr" && (
        <div className="border rounded-lg p-4 bg-orange-50">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-orange-600" />
            TeleBirr Payment Instructions
          </h4>
          <div className="space-y-3 text-sm">
            <div className="space-y-2">
              <div><strong>Step 1:</strong> Dial *127# from your phone</div>
              <div><strong>Step 2:</strong> Select "Send Money"</div>
              <div><strong>Step 3:</strong> Enter receiver number: 0911234567</div>
              <div><strong>Step 4:</strong> Enter amount: {course.priceEtb} ETB</div>
              <div><strong>Step 5:</strong> Enter reference: Course-{course.id}</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> After successful payment, please contact our support team at 
              +251 911 234 567 with your transaction ID for immediate enrollment.
            </p>
          </div>
        </div>
      )}
      
      <Button 
        type="submit" 
        disabled={(!stripe && paymentMethod === "stripe") || isLoading}
        className="w-full bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700"
      >
        {isLoading ? "Processing..." : 
         paymentMethod === "stripe" ? `Pay $${course.price} USD` : 
         paymentMethod === "bank_transfer" ? `Continue with Bank Transfer (${course.priceEtb} ETB)` :
         `Continue with TeleBirr (${course.priceEtb} ETB)`}
      </Button>
    </form>
  );
}

export default function PaymentModal({ course, onClose, onSuccess }: PaymentModalProps) {
  if (!course) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{course.title}</CardTitle>
              <CardDescription className="mt-1">
                Complete your enrollment by selecting a payment method
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">Course Price</div>
                <div className="text-sm text-gray-600">{course.duration} • {course.category}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">${course.price} USD</div>
                <div className="text-sm text-gray-600">{course.priceEtb} ETB</div>
              </div>
            </div>
          </div>
          
          <Elements stripe={stripePromise}>
            <PaymentForm course={course} onSuccess={onSuccess} />
          </Elements>
        </CardContent>
      </Card>
    </div>
  );
}