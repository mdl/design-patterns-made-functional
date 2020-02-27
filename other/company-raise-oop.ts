// Scenario:
// - we have company A with 2 empl and company B with 1 eml
// - company A raised compensation to all employees 500$, company B - 1000$

// Features of OOD:
// - Data and behavior is grouped together
// - Data is mutable

class OopEmployee {  
  constructor(private id: string, private salary = 500) {
  }

  raiseSalary(diff: number) {
    this.salary += diff
  }

  toString() {
    return `Employee ${this.id}`
  }
}

class OopCompany {
  employees: OopEmployee[] = []

  constructor(private id: string) {
  }

  toString() {
    return `
      Company ${this.id} with employees:\n
      ${this.employees.map(e => e.toString()).join('\n')}
    `
  }

  addEmployee(employee: OopEmployee) {
    this.employees.push(employee)
  }

  raiseSalary(diff: number) {
    this.employees.forEach(e => e.raiseSalary(diff))
  }
}

const oopClient = () => {
  const oophuman1 = new OopEmployee('human1')
  const oophuman2 = new OopEmployee('human2')
  const oophuman3 = new OopEmployee('human3')
  
  const oopcmp1 = new OopCompany('cmp1')
  const oopcmp2 = new OopCompany('cmp2')
  
  oopcmp1.addEmployee(oophuman1)
  oopcmp1.addEmployee(oophuman2)
  oopcmp2.addEmployee(oophuman3)
  
  oopcmp1.raiseSalary(500)
  oopcmp2.raiseSalary(1000)

  console.log(oopcmp1.toString())
  console.log(oopcmp2.toString())
}




/// Advanced scenarios of creation !!!!!!