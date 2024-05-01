import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/header/Header';
import { Bar } from '@ant-design/charts';
import { supabase } from '../lib/supabaseClient';

const ProductAnalysis = () => {
    const dispatch = useDispatch();
    const [monthlyData, setMonthlyData] = useState([]);

    const getMonthlySales = async () => {
        try {
            const { data, error } = await supabase.from('sales').select();
            if (data) {
                // Verileri aylara göre gruplama
                const monthlySales = data.reduce((acc, curr) => {
                    const month = new Date(curr.created_at).getMonth() + 1;
                    if (!acc[month]) {
                        acc[month] = 0;
                    }
                    acc[month] += curr.count;
                    return acc;
                }, {});

                // Ay bazında toplam satış miktarlarını ayarla
                const formattedData = Object.keys(monthlySales).map((month) => ({
                    month: `${month}. Ay`,
                    sales: monthlySales[month],
                }));
                setMonthlyData(formattedData);
            }
        } catch (error) {
            console.error('Veri alınamadı:', error.message);
        }
    };

    useEffect(() => {
        getMonthlySales();
    }, []);

    const config = {
        data: monthlyData,
        xField: 'month',
        yField: 'sales',
        xAxis: {
            label: {
                autoRotate: false, // Eksen etiketlerini döndürme
            },
        },
        yAxis: {
            label: {
                formatter: (text) => {
                    return `${text} Adet`;
                },
            },
        },
        meta: {
            month: {
                alias: 'Ay', // Eksen etiketi
            },
            sales: {
                alias: 'Satış Adetleri', // Eksen etiketi
            },
        },
    };

    return (
        <div>
            <Header />
            <h1 className='font-bold text-2xl text-center mt-3'>Aylara Göre Satış Analizi</h1>
            <div style={{ marginTop: '20px' }}>
                <Bar {...config} />
            </div>
        </div>
    );
};

export default ProductAnalysis;
