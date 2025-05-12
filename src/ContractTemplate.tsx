interface Contract {
  id: string;
  client: {
    fullName: string;
    email: string;
  };
  admin: {
    fullName: string;
    email: string;
  };
  sentAt: string;
  status: string; // "SENT", "ACCEPTED", "REJECTED", "REVOKED"
}

interface ContractTemplateProps {
  contract: Contract;
}

function ContractTemplate({ contract }: ContractTemplateProps) {
    return (
        <div className="bg-gray-800 p-6 rounded shadow-md text-white leading-relaxed space-y-4">
          <p><strong>Client Name:</strong> {contract.client.fullName}</p>
          <p><strong>Contract Date:</strong> {new Date(contract.sentAt).toLocaleDateString()}</p>
      
          <div className="mt-4 space-y-4">
            <p><strong>CONTRACT AGREEMENT</strong></p>
      
            <p>This Agreement is made on this {new Date(contract.sentAt).toLocaleDateString()} by and between:</p>
      
            <p>
              <strong>Tactical Hacker</strong>, hereinafter referred to as the "Company" (which term shall, unless repugnant to the context or meaning thereof, include its successors, assigns, affiliates, and sub-organizations),
            </p>
      
            <p>
              AND
            </p>
      
            <p>
              <strong>{contract.client.fullName}</strong>, hereinafter referred to as the "Client" (which term shall, unless repugnant to the context or meaning thereof, include their legal representatives, successors, and permitted assigns).
            </p>
      
            <p><strong>WHEREAS</strong>, the Company has established multiple operational sub-organizations to facilitate business activities;</p>
            <p><strong>AND WHEREAS</strong>, the Client intends to associate with one or more of these sub-organizations under a unified contractual framework;</p>
            <p><strong>NOW, THEREFORE,</strong> the Parties hereby agree as follows:</p>
      
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Purpose</strong><br />
                This Agreement sets forth the general terms under which the Client shall engage in business with Tactical Hacker or any of its sub-organizations including but not limited to TH-Scribes, TH-Creations, and others.
              </li>
      
              <li>
                <strong>Scope</strong><br />
                a. The Client agrees to abide by the Company’s guidelines and terms applicable to any specific engagement or project.<br />
                b. Separate statements of work (SOWs) or onboarding forms may be issued for individual sub-organization collaborations under this master agreement.
              </li>
      
              <li>
                <strong>Ownership and Rights</strong><br />
                a. All intellectual property rights in any deliverables shall be governed by the individual terms agreed upon in associated SOWs.<br />
                b. Unless explicitly agreed otherwise, Tactical Hacker shall retain full ownership of any work submitted by the Client for commercial engagement.
              </li>
      
              <li>
                <strong>Compensation</strong><br />
                a. Payment terms shall be defined and agreed upon separately for each project or engagement.<br />
                b. Tactical Hacker reserves the right to withhold payment if the Client fails to meet agreed deliverables or violates any terms of this Agreement.
              </li>
      
              <li>
                <strong>Confidentiality</strong><br />
                Both Parties agree to maintain strict confidentiality regarding all business information, creative content, strategies, and communications, unless disclosure is required by law or authorized in writing.
              </li>
      
              <li>
                <strong>Warranties and Representations</strong><br />
                a. The Client affirms that any work or content provided will be original and not infringe on any third-party rights.<br />
                b. The Client agrees that they have full authority to enter into this Agreement.
              </li>
      
              <li>
                <strong>Termination</strong><br />
                a. This Agreement may be terminated by either Party with written notice.<br />
                b. Any ongoing obligations or liabilities at the time of termination shall survive the termination.<br />
                c. Tactical Hacker may suspend or revoke the Client’s access to its platforms or sub-organizations in case of misconduct, breach, or non-compliance.
              </li>
      
              <li>
                <strong>Indemnity</strong><br />
                The Client agrees to indemnify and hold harmless the Company and its affiliates from any legal claims, damages, or losses resulting from breach of this Agreement or unlawful conduct.
              </li>
      
              <li>
                <strong>Governing Law and Jurisdiction</strong><br />
                This Agreement shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in [City, State].
              </li>
      
              <li>
                <strong>Miscellaneous</strong><br />
                a. This Agreement constitutes the entire understanding between the Parties and supersedes all prior agreements.<br />
                b. Amendments must be made in writing and signed by authorized representatives of both Parties.<br />
                c. If any provision is held to be unenforceable, the remaining provisions shall remain valid and enforceable.
              </li>
            </ol>
      
            <div className="pt-6 space-y-4">
              <p><strong>IN WITNESS WHEREOF</strong>, the Parties have executed this Agreement as of the date first written above.</p>
      
              <p>
                <strong>Company Representative</strong><br />
                Name: {contract.admin.fullName}<br />
                Designation: Administrator, Tactical Hacker<br />
                Email: {contract.admin.email}<br />
                Signature: ____________________<br />
                Date: {new Date(contract.sentAt).toLocaleDateString()}
              </p>
      
              <p>
                <strong>Client</strong><br />
                Name: {contract.client.fullName}<br />
                Email: {contract.client.email}<br />
                Signature: ____________________<br />
                Date: {new Date(contract.sentAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      );
      
}

export default ContractTemplate;