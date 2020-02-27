// Scenario:
// - we have company A with 2 empl and company B with 1 eml
// - company A raised compensation to all employees 500$, company B - 1000$

// Features of FD:
// - Data and behavior is fully separated
// - Data is immutable

interface FpEmployee {
  id: string
  salary: number
}

interface FpCompany {
  id: string
  employeeIds: string[]
}

const fpEmployee: (name: string, salary?: number) => FpEmployee
  = (name, salary = 500) => ({id: name, salary})

const fpCompany: (name: string) => FpCompany
  = name => ({id: name, employeeIds: []})

const addEmployee: (company: FpCompany, employeeId: string) => FpCompany
  = (company, employeeId) => ({
    ...company,
    employeeIds: [...company.employeeIds, employeeId]
  })

const raiseSalary: (employee: FpEmployee, diff: number) => FpEmployee
  = (employee, diff) => ({
    ...employee,
    salary: employee.salary + diff
  })

const employeeToString = ({id}: FpEmployee) => `Employee ${id}`

const companyToString = (
  {id, employeeIds}: FpCompany,
  employeeMap: {[employeeId: string]: FpEmployee},
) => `
  Company ${id} with employees:\n
  ${employeeIds.map(e => employeeToString(employeeMap[e])).join('\n')}
`

const fpClient = () => {
  const fphuman1 = fpEmployee('human1')
  const fphuman2 = fpEmployee('human2')
  const fphuman3 = fpEmployee('human3')
  const employeeMap = [fphuman1, fphuman2, fphuman3]
    .reduce((acc, human) => (acc[human.id] = human, acc), {})
  
  const fpcmp1 = fpCompany('cmp1')
  const fpcmp2 = fpCompany('cmp2')
  
  const fpcmp1WEmployyes = addEmployee(addEmployee(fpcmp1, fphuman1.id), fphuman2.id)
  const fpcmp2WEmployyes = addEmployee(fpcmp2, fphuman3.id)

  console.log(companyToString(fpcmp1WEmployyes, employeeMap))
  console.log(companyToString(fpcmp2WEmployyes, employeeMap))
}