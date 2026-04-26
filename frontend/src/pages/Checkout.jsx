import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Home, MapPin, Phone, Plus, Trash2 } from "lucide-react";
import { useAddress } from "@/context/AddressContext";

const Checkout = () => {
  const {
    address,
    loading,
    saving,
    modalOpen,
    setModalOpen,
    newAddress,
    setNewAddress,
    handleAddAddress,
    handleDeleteAddress,
  } = useAddress();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 flex flex-col gap-2 sm:mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Delivery Addresses
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 sm:text-base">
            Choose an address for delivery or add a new one.
          </p>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <>
            {address.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {address.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                        <MapPin className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-semibold text-slate-900 dark:text-white sm:text-lg">
                          Delivery Address
                        </h3>

                        <div className="mt-2 flex items-start gap-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                          <Home className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{item.address}</span>
                        </div>

                        <div className="mt-3 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <Phone className="h-4 w-4 shrink-0" />
                          <span>{item.phone}</span>
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <Link to={`/payment/${item._id}`} className="w-full">
                            <Button className="w-full rounded-xl py-5 text-base">
                              Use this address
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>

                          <Button
                            type="button"
                            variant="outline"
                            className="w-full rounded-xl py-5 text-base text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30"
                            onClick={() => handleDeleteAddress(item._id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mx-auto flex min-h-[45vh] max-w-xl items-center justify-center">
                <div className="w-full rounded-3xl border border-dashed bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                    <MapPin className="h-8 w-8 text-slate-500" />
                  </div>

                  <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                    No addresses found
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Add a delivery address to continue to checkout.
                  </p>

                  <Button
                    className="mt-6 w-full rounded-xl py-5 text-base sm:w-auto"
                    onClick={() => setModalOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Address
                  </Button>
                </div>
              </div>
            )}

            {address.length > 0 && (
              <div className="mt-6 flex justify-center sm:justify-start">
                <Button
                  className="w-full rounded-xl py-5 text-base sm:w-auto"
                  onClick={() => setModalOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Address
                </Button>
              </div>
            )}
          </>
        )}

        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
              <DialogDescription>
                Save a new delivery address for checkout.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <Input
                placeholder="Full address"
                 type="text"
                value={newAddress.address}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, address: e.target.value })
                }
                className="h-12 rounded-xl"
              />
              <Input
                placeholder="Phone number"
                type="number"
                value={newAddress.phone}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, phone: e.target.value })
                }
                className="h-12 rounded-xl"
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
            
              <Button
                className="rounded-xl"
                onClick={handleAddAddress}
                disabled={saving}
              >
                {saving ? "Saving..." : "Add Address"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Checkout;