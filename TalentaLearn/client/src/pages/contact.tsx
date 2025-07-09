import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  HelpCircle,
  BookOpen,
  CreditCard,
  Users,
  Globe,
  MessageCircle,
  Mic,
  Send
} from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [chatOpen, setChatOpen] = useState(false);
  const [voiceBotOpen, setVoiceBotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', message: 'Hello! I\'m Talenta AI Assistant. How can I help you today?' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactForm) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const sendChatMessage = () => {
    if (currentMessage.trim()) {
      setChatMessages([...chatMessages, 
        { sender: 'user', message: currentMessage },
        { sender: 'bot', message: 'Thank you for your message! Our support team will help you shortly.' }
      ]);
      setCurrentMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-amber-50 to-green-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-amber-600 to-green-600 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Send us a message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="billing">Billing Question</SelectItem>
                            <SelectItem value="course">Course Information</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us more about your inquiry..."
                            rows={6}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Get in Touch
                </CardTitle>
                <CardDescription>
                  Reach out to us through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">support@talenta.edu</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-600">+251 911 234 567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-600">Bole, Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Office Hours
                </CardTitle>
                <CardDescription>
                  We're here to help during these hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday - Friday</span>
                    <span className="text-gray-600">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Saturday</span>
                    <span className="text-gray-600">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sunday</span>
                    <span className="text-gray-600">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Support Options */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Quick Support</CardTitle>
                <CardDescription>
                  Get instant help with our support tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => setChatOpen(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Live Chat Support
                </Button>
                <Button 
                  onClick={() => setVoiceBotOpen(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Voice Assistant
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chat Bot Modal */}
        {chatOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md m-4 max-h-[80vh] flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Live Chat Support</CardTitle>
                <Button 
                  onClick={() => setChatOpen(false)}
                  className="h-8 w-8 p-0"
                  variant="ghost"
                >
                  ×
                </Button>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 border rounded p-4 mb-4 bg-gray-50 overflow-y-auto max-h-64">
                  <div className="space-y-2">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={`${msg.sender === 'bot' ? 'text-left' : 'text-right'}`}>
                        <div className={`inline-block p-2 rounded max-w-xs ${
                          msg.sender === 'bot' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-white border ml-auto'
                        }`}>
                          <p className="text-sm">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Input 
                    placeholder="Type your message..." 
                    className="flex-1"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  />
                  <Button onClick={sendChatMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Voice Bot Modal */}
        {voiceBotOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md m-4">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Voice Assistant</CardTitle>
                <Button 
                  onClick={() => setVoiceBotOpen(false)}
                  className="h-8 w-8 p-0"
                  variant="ghost"
                >
                  ×
                </Button>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Mic className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-lg font-medium">Voice Assistant Ready</p>
                  <p className="text-sm text-gray-600">Click to start voice interaction</p>
                </div>
                <div className="space-y-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <Mic className="w-4 h-4 mr-2" />
                    Start Voice Chat
                  </Button>
                  <Button variant="outline" className="w-full">
                    Stop Recording
                  </Button>
                  <div className="text-xs text-gray-500 mt-4">
                    <p>Try saying: "Tell me about courses" or "Help with enrollment"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}