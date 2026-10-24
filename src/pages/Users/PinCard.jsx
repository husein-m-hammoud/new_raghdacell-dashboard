import { useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { fetchData } from "../../APIs/useMyAPI";
import Loading from "../../Tools/Loading";

const PinCard = ({ userId }) => {
  const [currentPin, setCurrentPin] = useState(null);
  const [hasPin, setHasPin] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetchData(`admin/users/${userId}/pin`, null, "GET");
      setCurrentPin(res?.data?.pin_code ?? null);
      setHasPin(!!res?.data?.has_pin);
    } catch (e) {
      setError("Failed to load PIN");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const save = async () => {
    if (!/^\d{4}$/.test(newPin)) {
      setError("PIN must be exactly 4 digits");
      return;
    }
    try {
      setSaving(true);
      setError("");
      setMessage("");
      await fetchData(`admin/users/${userId}/pin`, { pin_code: newPin }, "PUT");
      setMessage("PIN updated");
      setNewPin("");
      await load();
    } catch (e) {
      setError("Failed to save PIN");
    } finally {
      setSaving(false);
    }
  };

  const clear = async () => {
    if (!window.confirm("Clear this user's PIN? They will be forced to set a new one on next login.")) {
      return;
    }
    try {
      setSaving(true);
      setError("");
      setMessage("");
      await fetchData(`admin/users/${userId}/pin`, null, "DELETE");
      setMessage("PIN cleared");
      await load();
    } catch (e) {
      setError("Failed to clear PIN");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="border-2 border-Purple rounded-2xl p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">PIN Code</h2>

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-semibold">Current:</span>
            {hasPin ? (
              <>
                <span className="font-mono text-lg tracking-widest">
                  {showPin ? currentPin : "••••"}
                </span>
                {showPin ? (
                  <BiShow
                    size={22}
                    className="cursor-pointer"
                    onClick={() => setShowPin(false)}
                  />
                ) : (
                  <BiHide
                    size={22}
                    className="cursor-pointer"
                    onClick={() => setShowPin(true)}
                  />
                )}
              </>
            ) : (
              <span className="text-gray-500">Not set</span>
            )}
          </div>

          <div className="flex flex-col gap-2 mb-3">
            <label className="font-semibold">Set new PIN (4 digits)</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={newPin}
              onChange={(e) =>
                setNewPin(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              placeholder="****"
              className="border py-3 px-3 rounded-xl tracking-widest text-center"
            />
          </div>

          {saving ? <Loading /> : ""}
          {error ? <div className="text-red-600 mb-2">{error}</div> : ""}
          {message ? <div className="text-green-600 mb-2">{message}</div> : ""}

          <div className="flex gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="py-3 px-6 rounded-xl text-white cursor-pointer bg-gradient-to-l to-Pink from-Purple"
            >
              Save PIN
            </button>
            {hasPin && (
              <button
                onClick={clear}
                disabled={saving}
                className="py-3 px-6 rounded-xl text-white cursor-pointer bg-red-500 hover:bg-red-600"
              >
                Clear PIN
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PinCard;
