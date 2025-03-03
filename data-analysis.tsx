import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const GlutenFreeAnalysis = () => {
  // البيانات المستخرجة من الجدول
  const data = [
    { id: 1, code: '550010000', name: 'خبز (شرائح خبز) خالي من الجلوتين', price: 29.90, quantity: 27240, totalPrice: 206310, monthlyMaternity: 1500, monthlyKingFahd: 1800 },
    { id: 2, code: '550010001', name: 'خبز (صامولي) خالي من الجلوتين', price: 31.05, quantity: 27240, totalPrice: 214245, monthlyMaternity: 1500, monthlyKingFahd: 1800 },
    { id: 3, code: '550010002', name: 'خبز تورتيلا خالي من الجلوتين', price: 33.93, quantity: 21792, totalPrice: 197444, monthlyMaternity: 1500, monthlyKingFahd: 1440 },
    { id: 4, code: '550010003', name: 'خبز دائري برجر خالي من الجلوتين', price: 28.75, quantity: 10896, totalPrice: 105225, monthlyMaternity: 1500, monthlyKingFahd: 720 },
    { id: 5, code: '550010004', name: 'خليط الدقيق الخالي من الجلوتين', price: 35.65, quantity: 5448, totalPrice: 59892, monthlyMaternity: 600, monthlyKingFahd: 360 },
    { id: 6, code: '550010005', name: 'خليط الدقيق الخالي من الجلوتين + خميرة', price: 37.95, quantity: 5448, totalPrice: 63756, monthlyMaternity: 600, monthlyKingFahd: 360 },
    { id: 7, code: '550010015', name: 'معكرونة سباغيتي خالية من الجلوتين', price: 32.20, quantity: 10896, totalPrice: 54096, monthlyMaternity: 600, monthlyKingFahd: 360 },
    { id: 8, code: '550010017', name: 'حبوب إفطار (رقائق الذرة)', price: 32.20, quantity: 10896, totalPrice: 88872, monthlyMaternity: 600, monthlyKingFahd: 720 },
    { id: 9, code: '550010026', name: 'بسكويت اعواد شوكولاتة', price: 35.65, quantity: 5448, totalPrice: 59892, monthlyMaternity: 600, monthlyKingFahd: 360 },
    { id: 10, code: '550010030', name: 'كوكيز محشو بالتوفي', price: 31.05, quantity: 5448, totalPrice: 52164, monthlyMaternity: 600, monthlyKingFahd: 360 },
    { id: 11, code: '550010033', name: 'بسكويت كراكر خالي من الجلوتين', price: 27.60, quantity: 5448, totalPrice: 46368, monthlyMaternity: 600, monthlyKingFahd: 360 },
    { id: 12, code: '550010038', name: 'شوفان خالي من الجلوتين', price: 37.95, quantity: 10896, totalPrice: 104742, monthlyMaternity: 600, monthlyKingFahd: 720 },
    { id: 15, code: '998803017', name: 'مكرونة حلزوني / لولبي', price: 26.45, quantity: 300, totalPrice: 47610, monthlyMaternity: 600, monthlyKingFahd: 0 },
  ];

  // تصنيف البيانات حسب النوع
  const categories = {
    bread: data.filter(item => item.id <= 4),
    flour: data.filter(item => item.id === 5 || item.id === 6),
    pasta: data.filter(item => item.id === 7 || item.id === 15),
    cereals: data.filter(item => item.id === 8 || item.id === 12),
    biscuits: data.filter(item => item.id === 9 || item.id === 10 || item.id === 11)
  };

  // مجموع التكاليف حسب الفئة
  const costByCategory = [
    { name: 'الخبز', value: categories.bread.reduce((sum, item) => sum + item.totalPrice, 0) },
    { name: 'الدقيق', value: categories.flour.reduce((sum, item) => sum + item.totalPrice, 0) },
    { name: 'المعكرونة', value: categories.pasta.reduce((sum, item) => sum + item.totalPrice, 0) },
    { name: 'الحبوب', value: categories.cereals.reduce((sum, item) => sum + item.totalPrice, 0) },
    { name: 'البسكويت', value: categories.biscuits.reduce((sum, item) => sum + item.totalPrice, 0) },
  ];

  // مقارنة الطلبات الشهرية بين المستشفيين
  const hospitalComparison = data.map(item => ({
    name: item.name.substring(0, 15) + '...',
    'مستشفى الولادة': item.monthlyMaternity,
    'مستشفى الملك فهد': item.monthlyKingFahd
  }));

  // مقارنة الأسعار
  const priceComparison = data.map(item => ({
    name: item.name.substring(0, 15) + '...',
    'السعر (ريال)': item.price
  }));

  // قطاع الكميات
  const quantityData = data.map(item => ({
    name: item.name.substring(0, 15) + '...',
    الكمية: item.quantity
  }));

  // ألوان للرسم البياني الدائري
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const [activeTab, setActiveTab] = useState('prices');

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg rtl">
      <h1 className="text-2xl font-bold mb-6 text-center">تحليل منتجات خالية من الجلوتين للمستشفيات</h1>
      
      <div className="flex justify-center mb-6">
        <div className="flex space-x-2 space-x-reverse">
          <button 
            className={`px-4 py-2 rounded ${activeTab === 'prices' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('prices')}
          >
            مقارنة الأسعار
          </button>
          <button 
            className={`px-4 py-2 rounded ${activeTab === 'quantities' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('quantities')}
          >
            الكميات
          </button>
          <button 
            className={`px-4 py-2 rounded ${activeTab === 'hospitals' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('hospitals')}
          >
            مقارنة المستشفيات
          </button>
          <button 
            className={`px-4 py-2 rounded ${activeTab === 'categories' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('categories')}
          >
            التكلفة حسب الفئة
          </button>
        </div>
      </div>

      {activeTab === 'prices' && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">مقارنة الأسعار الإفرادية للمنتجات</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={priceComparison} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="السعر (ريال)" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'quantities' && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">كميات المنتجات المستلمة</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={quantityData} margin={{ top: 20, right: 30, left: 40, bottom: 100 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="الكمية" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'hospitals' && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">مقارنة الطلبات الشهرية بين المستشفيات</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={hospitalComparison} margin={{ top: 20, right: 30, left: 40, bottom: 100 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="مستشفى الولادة" fill="#0088FE" />
              <Bar dataKey="مستشفى الملك فهد" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'categories' && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">إجمالي التكلفة حسب فئة المنتج</h2>
          <div className="flex">
            <div className="w-1/2">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={costByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {costByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value.toLocaleString()} ريال`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2">
              <h3 className="text-lg font-medium mb-3">تفاصيل التكلفة حسب الفئة</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-right">الفئة</th>
                    <th className="border p-2 text-right">التكلفة (ريال)</th>
                    <th className="border p-2 text-right">النسبة</th>
                  </tr>
                </thead>
                <tbody>
                  {costByCategory.map((category, idx) => {
                    const totalCost = costByCategory.reduce((sum, cat) => sum + cat.value, 0);
                    const percentage = ((category.value / totalCost) * 100).toFixed(1);
                    return (
                      <tr key={idx}>
                        <td className="border p-2">{category.name}</td>
                        <td className="border p-2">{category.value.toLocaleString()}</td>
                        <td className="border p-2">{percentage}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-50 rounded border">
        <h3 className="text-lg font-semibold mb-2">ملخص التحليل:</h3>
        <ul className="list-disc pr-6 space-y-2">
          <li>إجمالي قيمة العقد: {data.reduce((sum, item) => sum + item.totalPrice, 0).toLocaleString()} ريال سعودي</li>
          <li>منتجات الخبز تمثل النسبة الأكبر من التكلفة والكمية</li>
          <li>متوسط سعر المنتج: {(data.reduce((sum, item) => sum + item.price, 0) / data.length).toFixed(2)} ريال</li>
          <li>احتياجات مستشفى الملك فهد من الخبز مساوية لمستشفى الولادة بينما تختلف في المنتجات الأخرى</li>
        </ul>
      </div>
    </div>
  );
};

export default GlutenFreeAnalysis;
