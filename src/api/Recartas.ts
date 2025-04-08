export interface ChartData {
    name: string;
    value: number;
  }
const Recartas = async () => {
    // Simulando uma chamada de API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { name: 'Grupo A', value: 400 },
          { name: 'Grupo B', value: 300 },
          { name: 'Grupo C', value: 300 },
          { name: 'Grupo D', value: 200 },
        ]);
      }, 1000);
    });
  };
  
  export default Recartas;