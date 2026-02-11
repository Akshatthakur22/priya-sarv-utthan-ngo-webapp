// Example usage for /contact page
import StructuredData from "@/components/StructuredData";

// Custom contact data
const contactData = {
  telephone: "+91-70000-78439",
  email: "priyasarvuthan@gmail.com",
  availableLanguage: ["Hindi", "English", "Marathi", "Gujarati"]
};

export default function ContactPage() {
  return (
    <>
      {/* ContactPoint Schema */}
      <StructuredData 
        type="ContactPoint" 
        data={contactData} 
      />
      
      {/* Your existing contact page content */}
      <div>
        <h1>Contact Us</h1>
        <p>Get in touch for support, donations, or legal aid...</p>
        {/* Contact forms and information */}
      </div>
    </>
  );
}
