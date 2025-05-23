import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import * as echarts from 'echarts'; // Assuming echarts is installed

// Mock data structure - Simplified
const structureData = {
  'Planta': {
    'Unidade 1': {},
    'Unidade 2': {}
  },
};

// Define unit types
type UnitName = 'Unidade 1' | 'Unidade 2';

interface TreeNodeProps {
  label: string;
  children?: any;
  level?: number;
  path?: string[];
  onUnitSelect?: (unit: UnitName) => void;
}

function TreeNode({ label, children, level = 0, path = [], onUnitSelect }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  // Simplified hasChildren logic based on the new structure
  const hasChildren = children && Object.keys(children).length > 0;
  const currentPath = [...path, label];

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else if (label === 'Unidade 1' || label === 'Unidade 2') {
      onUnitSelect?.(label as UnitName);
    }
  };

  const renderChildren = () => {
    // Simplified renderChildren based on the new structure
    return Object.entries(children).map(([key, value]) => (
      <TreeNode
        key={key}
        label={key}
        children={value}
        path={currentPath}
        level={level + 1}
        onUnitSelect={onUnitSelect}
      />
    ));
  };

  return (
    <div className="ml-4">
      <div
        className="flex items-center py-1 hover:bg-gray-100 rounded cursor-pointer"
        onClick={handleClick}
      >
        <span className="mr-1">
          {hasChildren && (isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
        </span>
        <span className="text-sm text-gray-700">{label}</span>
      </div>
      {isExpanded && hasChildren && (
        <div>{renderChildren()}</div>
      )}
    </div>
  );
}

function Cooperative() {
  // Removed tag selection state and handlers
  const [selectedUnit, setSelectedUnit] = useState<UnitName | null>(null);

  const handleUnitSelect = (unit: UnitName) => {
    setSelectedUnit(unit);
  };

  // Echarts setup
  useEffect(() => {
    if (selectedUnit) {
      const chartDom = document.getElementById('echarts-container');
      const myChart = echarts.init(chartDom);
      const option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }
        ]
      };
      myChart.setOption(option);

      // Dispose chart on component unmount or unit change
      return () => {
        myChart.dispose();
      };
    }
  }, [selectedUnit]); // Rerun effect when selectedUnit changes

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Estrutura</h2>
            <Search size={18} className="text-gray-500" />
          </div>
          <div className="relative">
            <input
              type="text"
              className="w-full p-2 pl-8 border rounded-lg text-sm"
              placeholder="Buscar..."
            />
            <Search size={16} className="absolute left-2 top-2.5 text-gray-400" />
          </div>
          <div className="mt-4 overflow-y-auto">
            {Object.entries(structureData).map(([key, value]) => (
              <TreeNode
                key={key}
                label={key}
                children={value}
                path={[]}
                onUnitSelect={handleUnitSelect}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-xl font-semibold mb-4">
            {selectedUnit ? `Dados da ${selectedUnit}` : 'Selecione uma Unidade'}
          </h1>

          {/* Removed Tag Selection UI */}

        </div>

        {/* Chart Area */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="h-96">
            {!selectedUnit ? (
              <div className="h-full flex items-center justify-center text-gray-500">
                <p>Selecione uma unidade para exibir o gráfico</p>
              </div>
            ) : (
              <div id="echarts-container" className="h-full w-full"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cooperative;