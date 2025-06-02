'use client'

import React, { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'

type OrderItem = {
  id: string
  productId: string
  quantity: number
  price: number
}

type Order = {
  id: string
  createdAt: string
  items: OrderItem[]
}

type DailyMetric = {
  date: string
  value: number
}

const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [dailyRevenueData, setDailyRevenueData] = useState<DailyMetric[]>([])
  const [dailySalesData, setDailySalesData] = useState<DailyMetric[]>([])

  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: '1',
        createdAt: '2025-05-26T09:00:00Z', // Segunda
        items: [{ id: '1', productId: 'a', quantity: 1, price: 120 }],
      },
      {
        id: '2',
        createdAt: '2025-05-27T11:00:00Z', // Terça
        items: [
          { id: '2', productId: 'b', quantity: 2, price: 75 },
          { id: '3', productId: 'c', quantity: 1, price: 60 },
        ],
      },
      {
        id: '3',
        createdAt: '2025-05-28T14:00:00Z', // Quarta
        items: [{ id: '4', productId: 'd', quantity: 3, price: 50 }],
      },
      {
        id: '4',
        createdAt: '2025-05-29T10:00:00Z', // Quinta
        items: [
          { id: '5', productId: 'e', quantity: 1, price: 90 },
          { id: '6', productId: 'f', quantity: 2, price: 110 },
        ],
      },
      {
        id: '5',
        createdAt: '2025-05-30T16:00:00Z', // Sexta
        items: [{ id: '7', productId: 'g', quantity: 1, price: 300 }],
      },
      {
        id: '6',
        createdAt: '2025-05-31T18:00:00Z', // Sábado
        items: [
          { id: '8', productId: 'h', quantity: 2, price: 130 },
          { id: '9', productId: 'i', quantity: 1, price: 50 },
        ],
      },
      {
        id: '7',
        createdAt: '2025-06-01T12:00:00Z', // Domingo
        items: [{ id: '10', productId: 'j', quantity: 4, price: 80 }],
      },
    ]

    setOrders(mockOrders)
  }, [])

  useEffect(() => {
    const groupedRevenue: Record<string, number> = {}
    const groupedSales: Record<string, number> = {}

    orders.forEach(order => {
      const date = new Date(order.createdAt).toLocaleDateString('pt-BR')
      const totalRevenue = order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
      const totalQuantity = order.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      )

      groupedRevenue[date] = (groupedRevenue[date] || 0) + totalRevenue
      groupedSales[date] = (groupedSales[date] || 0) + totalQuantity
    })

    const revenueResult: DailyMetric[] = Object.entries(groupedRevenue).map(
      ([date, value]) => ({ date, value })
    )

    const salesResult: DailyMetric[] = Object.entries(groupedSales).map(
      ([date, value]) => ({ date, value })
    )

    const sortByDate = (a: DailyMetric, b: DailyMetric) => {
      const [dayA, monthA, yearA] = a.date.split('/').map(Number)
      const [dayB, monthB, yearB] = b.date.split('/').map(Number)
      return (
        new Date(yearA, monthA - 1, dayA).getTime() -
        new Date(yearB, monthB - 1, dayB).getTime()
      )
    }

    setDailyRevenueData(revenueResult.sort(sortByDate))
    setDailySalesData(salesResult.sort(sortByDate))
  }, [orders])

  return (
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Pedidos da Semana
          </h2>
          <p className="text-3xl font-bold text-blue-600">{orders.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Valor Semanal
          </h2>
          <p className="text-3xl font-bold text-green-600">
            R$ {dailyRevenueData.reduce((acc, item) => acc + item.value, 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Gráfico de Receita Diária */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Receita Diária
        </h2>
        <ChartContainer
          config={{
            revenue: {
              label: 'Receita',
              color: '#4ade80',
            },
          }}
          className="w-full h-[300px]"
        >
          <BarChart data={dailyRevenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent nameKey="revenue" />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="value"
              fill="var(--color-revenue)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>

      {/* Gráfico de Vendas Diárias */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Vendas Diárias
        </h2>
        <ChartContainer
          config={{
            revenue: {
              label: 'Vendas',
              color: '#4000FF',
            },
          }}
          className="w-full h-[300px]"
        >
          <BarChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent nameKey="revenue" />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="value"
              fill="var(--color-revenue)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}

export default Dashboard
