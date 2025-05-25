import React, { useState } from "react";

const customers = ["สมชาย", "สุนีย์", "วิทยา"]; // ชื่อผู้สั่ง
const data = [
  {
    shop: "ร้านก๋วยเตี๋ยว",
    menu: ["ก๋วยเตี๋ยวหมู", "ก๋วยเตี๋ยวเนื้อ", "ข้าวหน้าเป็ด"],
  },
  {
    shop: "ร้านข้าวมันไก่",
    menu: ["ข้าวมันไก่ธรรมดา", "ข้าวมันไก่พิเศษ"],
  },
];

export default function App() {
  const [page, setPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedShop, setSelectedShop] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [orderDetails, setOrderDetails] = useState("");
  const [orders, setOrders] = useState({}); // เก็บข้อมูลการสั่ง (key: shop|menu, value: [ชื่อผู้สั่ง])

  // หน้า 1: เลือกผู้สั่ง, เลือกร้าน+เมนู
  function Page1() {
    return (
      <div>
        <h2>หน้า 1: เลือกชื่อผู้สั่ง</h2>
        <select
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
        >
          <option value="">-- เลือกชื่อผู้สั่ง --</option>
          {customers.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <h2>เลือกเมนู (กดชื่อเมนูเพื่อไปหน้า 2)</h2>
        {data.map(({ shop, menu }) => (
          <div key={shop} style={{ marginTop: 20 }}>
            <h3>{shop}</h3>
            {menu.map((item) => {
              const key = `${shop}|${item}`;
              return (
                <div key={item} style={{ marginBottom: 8 }}>
                  <button
                    disabled={!selectedCustomer}
                    onClick={() => {
                      setSelectedShop(shop);
                      setSelectedMenu(item);
                      setPage(2);
                    }}
                  >
                    {item}
                  </button>

                  {/* แสดงชื่อผู้สั่งใต้เมนู */}
                  {orders[key] && orders[key].length > 0 && (
                    <div
                      style={{
                        fontSize: "0.9em",
                        color: "green",
                        marginLeft: 10,
                      }}
                    >
                      สั่งโดย: {orders[key].join(", ")}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  // หน้า 2: ใส่รายละเอียดเมนูที่สั่ง
  function Page2() {
    return (
      <div>
        <h2>หน้า 2: รายละเอียดเมนูที่สั่ง</h2>
        <p>
          ร้าน: <b>{selectedShop}</b>
        </p>
        <p>
          เมนู: <b>{selectedMenu}</b>
        </p>
        <label>
          รายละเอียดเพิ่มเติม: <br />
          <textarea
            value={orderDetails}
            onChange={(e) => setOrderDetails(e.target.value)}
            rows={4}
            cols={50}
            placeholder="ใส่รายละเอียดเพิ่มเติม..."
          />
        </label>
        <br />
        <button onClick={() => setPage(1)}>ย้อนกลับ</button>
        <button
          onClick={() => {
            setPage(3);
          }}
          disabled={!orderDetails.trim()}
          style={{ marginLeft: 10 }}
        >
          ตกลง
        </button>
      </div>
    );
  }

  // หน้า 3: สรุปผลการเลือกเมนู
  function Page3() {
    function confirmOrder() {
      const key = `${selectedShop}|${selectedMenu}`;
      setOrders((prev) => {
        const prevList = prev[key] || [];
        if (!prevList.includes(selectedCustomer)) {
          return { ...prev, [key]: [...prevList, selectedCustomer] };
        }
        return prev;
      });
      alert("สั่งซื้อสำเร็จ!");
      // รีเซ็ตหรือกลับหน้า 1
      setOrderDetails("");
      setSelectedShop("");
      setSelectedMenu("");
      setSelectedCustomer("");
      setPage(1);
    }

    return (
      <div>
        <h2>หน้า 3: สรุปคำสั่งซื้อ</h2>
        <p>
          ชื่อผู้สั่ง: <b>{selectedCustomer}</b>
        </p>
        <p>
          ร้าน: <b>{selectedShop}</b>
        </p>
        <p>
          เมนู: <b>{selectedMenu}</b>
        </p>
        <p>
          รายละเอียดเพิ่มเติม: <b>{orderDetails}</b>
        </p>
        <button onClick={() => setPage(2)}>ย้อนกลับ</button>
        <button onClick={confirmOrder} style={{ marginLeft: 10 }}>
          ยืนยันการสั่ง
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      {page === 1 && <Page1 />}
      {page === 2 && <Page2 />}
      {page === 3 && <Page3 />}
    </div>
  );
}
