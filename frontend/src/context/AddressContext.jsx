import { server } from "@/main";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useContext } from "react";
import Cookies from "js-cookie";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const [newAddress, setNewAddress] = useState({
    address: "",
    phone: "",
  });

  async function fetchAddress() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/address/all`, {
        headers: {
          token: Cookies.get("token"),
        },
      });
      setAddress(data);
    } catch (error) {
      console.error("Error fetching address:", error);
      toast.error("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddAddress() {
    if (!newAddress.address.trim() || !newAddress.phone.trim()) {
      toast.error("Please fill in both address and phone");
      return;
    }

    setSaving(true);
    try {
      const { data } = await axios.post(
        `${server}/api/address/add`,
        newAddress,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      toast.success(data.message || "Address added");
      await fetchAddress();
      setNewAddress({ address: "", phone: "" });
      setModalOpen(false);
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error(error.response?.data?.message || "Error adding address");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteAddress(id) {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      const { data } = await axios.delete(`${server}/api/address/${id}`, {
        headers: {
          token: Cookies.get("token"),
        },
      });

      toast.success(data.message || "Address deleted");
      await fetchAddress();
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error(error.response?.data?.message || "Error deleting address");
    }
  }


  async function fetchSingleAddress(id) {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/address/${id}`, {
        headers: {
          token: Cookies.get("token"),
        },
      });
      setSelectedAddress(data);
    } catch (error) {
      console.error("Error fetching single address:", error);
      toast.error("Failed to load address");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <AddressContext.Provider
      value={{
        address,
        loading,
        saving,
        modalOpen,
        setModalOpen,
        newAddress,
        setNewAddress,
        fetchAddress,
        handleAddAddress,
        handleDeleteAddress,
        fetchSingleAddress,
        selectedAddress,
        setSelectedAddress,
        setLoading,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
