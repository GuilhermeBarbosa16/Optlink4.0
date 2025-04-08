import React, { useState } from 'react';
import { ChevronDown, ChevronRight, X, Search } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data structure
const structureData = {
  'Planta': {
    'Unidad 1': {
      'Planta': {
        'Subsistema': {
          'Chute de Aços': ['Área 1', 'Área 2']
        }
      }
    },
    'Unidade 2': {}
  },
};

// Mock tag data
const availableTags = [
  'Área 1 - TEMP',
  'Área 1 - PRES',
  'Área 1 - VIB',
  'Área 2 - TEMP',
  'Área 2 - PRES',
  'Área 2 - VIB',
];

// Mock chart data
const chartData = [
  { time: '00:00', 'Área 1 - TEMP': 4000, 'Área 1 - PRES': 2400 },
  { time: '04:00', 'Área 1 - TEMP': 3000, 'Área 1 - PRES': 1398 },
  { time: '08:00', 'Área 1 - TEMP': 2000, 'Área 1 - PRES': 9800 },
  { time: '12:00', 'Área 1 - TEMP': 2780, 'Área 1 - PRES': 3908 },
  { time: '16:00', 'Área 1 - TEMP': 1890, 'Área 1 - PRES': 4800 },
  { time: '20:00', 'Área 1 - TEMP': 2390, 'Área 1 - PRES': 3800 },
  { time: '24:00', 'Área 1 - TEMP': 3490, 'Área 1 - PRES': 4300 },
];

interface TreeNodeProps {
  label: string;
  children?: any;
  level?: number;
  path?: string[];
}

function TreeNode({ label, children, level = 0, path = [] }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = children && (Array.isArray(children) ? children.length > 0 : Object.keys(children).length > 0);
  const currentPath = [...path, label];

  const renderChildren = () => {
    if (Array.isArray(children)) {
      return children.map((child: string) => (
        <TreeNode
          key={child}
          label={child}
          path={currentPath}
          level={level + 1}
        />
      ));
    }
    return Object.entries(children).map(([key, value]) => (
      <TreeNode
        key={key}
        label={key}
        children={value}
        path={currentPath}
        level={level + 1}
      />
    ));
  };

  return (
    <div className="ml-4">
      <div
        className="flex items-center py-1 hover:bg-gray-100 rounded cursor-pointer"
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setTagInput('');
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const filteredTags = availableTags.filter(tag =>
    tag.toLowerCase().includes(tagInput.toLowerCase()) &&
    !selectedTags.includes(tag)
  );

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
              <TreeNode key={key} label={key} children={value} path={[]} />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-xl font-semibold mb-4">Comparação de Tags</h1>

          {/* Tag Selection */}
          <div className="space-y-2">
            {selectedTags.map(tag => (
              <div
                key={tag}
                className="bg-gray-200 p-2 rounded flex items-center justify-between"
              >
                <span className="text-sm text-gray-700">{tag}</span>
                <X
                  size={16}
                  className="cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => removeTag(tag)}
                />
              </div>
            ))}

            <div className="relative">
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-100"
                placeholder="Adicionar tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              {tagInput && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                  {filteredTags.map(tag => (
                    <div
                      key={tag}
                      className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => handleTagSelect(tag)}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="h-96">
            {selectedTags.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500">
                <p>Selecione tags para exibir o gráfico</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {selectedTags.map((tag, index) => (
                    <Line
                      key={tag}
                      type="monotone"
                      dataKey={tag}
                      stroke={`hsl(${index * 60}, 70%, 50%)`}
                      dot={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cooperative;