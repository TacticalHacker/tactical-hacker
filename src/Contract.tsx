import { useEffect, useState } from 'react';
import { API_BASE_URL } from './constants';
import Cookies from 'js-cookie';
import ContractTemplate from './ContractTemplate';

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

function Contract() {
  const [contract, setContract] = useState<Contract | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/client/getContract`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Map the API response to the Contract interface
          const mappedContract: Contract = {
            id: data.contract.id,
            client: {
              fullName: data.user.fullName,
              email: data.user.email,
            },
            admin: {
              fullName: data.contract.admin.fullName,
              email: data.contract.admin.email,
            },
            sentAt: data.contract.sentAt,
            status: data.contract.status,
          };

          setContract(mappedContract);
        } else {
          setError('No Contracts Yet');
        }
      } catch (err) {
        setError('Failed to connect to the server.');
      }
    };

    fetchContract();
  }, []);

  const handleAcceptContract = async () => {
    if (!contract) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/client/acceptContract/${contract.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`,
        },
      });

      if (response.ok) {
        setContract({ ...contract, status: 'ACCEPTED' });
      } else {
        setError('Failed to accept the contract.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    }
  };

  const handleRejectContract = async () => {
    if (!contract) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/client/rejectContract/${contract.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`,
        },
      });

      if (response.ok) {
        setContract({ ...contract, status: 'REJECTED' });
      } else {
        setError('Failed to reject the contract.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    }
  };

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (!contract) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Contract</h1>
      <ContractTemplate contract={contract} />
      <div className="mt-6">
        {contract.status === 'SENT' && (
          <>
            <button
              onClick={handleAcceptContract}
              className="bg-green-500 px-4 py-2 rounded mr-4 hover:bg-green-600 transition"
            >
              Accept
            </button>
            <button
              onClick={handleRejectContract}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Reject
            </button>
          </>
        )}
        {contract.status === 'ACCEPTED' && (
          <p className="text-green-500">You have accepted this contract.</p>
        )}
        {contract.status === 'REJECTED' && (
          <p className="text-red-500">You have rejected this contract.</p>
        )}
        {contract.status === 'REVOKED' && (
          <p className="text-yellow-500">You have revoked this contract.</p>
        )}
      </div>
    </div>
  );
}

export default Contract;