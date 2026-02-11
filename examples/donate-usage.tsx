// Example usage for /donate page
import StructuredData from "@/components/StructuredData";

// Custom donation data
const donationData = {
  amount: "500",
  currency: "INR",
  purpose: "Support women empowerment, child education, and community development programs in Madhya Pradesh"
};

export default function DonatePage() {
  return (
    <>
      {/* DonateAction Schema */}
      <StructuredData 
        type="DonateAction" 
        data={donationData} 
      />
      
      {/* Your existing donate page content */}
      <div>
        <h1>Make a Donation</h1>
        <p>Your contribution helps us continue our mission...</p>
        {/* Donation forms and payment components */}
      </div>
    </>
  );
}
