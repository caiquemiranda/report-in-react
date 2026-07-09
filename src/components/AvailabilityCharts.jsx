import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import styled from 'styled-components';

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-bottom: 50px;
`;

export const AvailabilityCharts = ({ dataPainel, dataGeral }) => (
  <>
    <h3 style={{ textAlign: 'center', fontSize: '14px' }}>DISPONIBILIDADE POR PAINEL</h3>
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dataPainel}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="nome" fontSize={12} />
          <YAxis domain={[80, 100]} hide />
          <Bar dataKey="valor" fill="#2bb5a3" radius={[4, 4, 0, 0]}>
            <LabelList dataKey="valor" position="top" fontSize={10} formatter={(v) => `${v}%`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>

    <h3 style={{ textAlign: 'center', fontSize: '14px' }}>DISPONIBILIDADE GERAL DO SISTEMA</h3>
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dataGeral} barSize={60}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="mes" fontSize={12} />
          <YAxis domain={[80, 100]} hide />
          <Bar dataKey="valor" fill="#17d3d6" radius={[4, 4, 0, 0]}>
            <LabelList dataKey="valor" position="top" fontSize={12} formatter={(v) => `${v}%`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  </>
);