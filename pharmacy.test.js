import {
  Drug,
  Pharmacy,
  specificDrugNames,
  BENEFIT_MAX,
  BENEFIT_MIN,
} from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn for a normal drug", () => {
    const pharmacy = new Pharmacy([new Drug("Doliprane", 2, 3)]);
    const updatedDrugs = pharmacy.updateBenefitValue();
    expect(updatedDrugs).toEqual([new Drug("Doliprane", 1, 2)]);
  });

  it("should double decrease the benefit for a standard drug after expiration", () => {
    const pharmacy = new Pharmacy([new Drug("Doliprane", 0, 2)]);
    const updatedDrugs = pharmacy.updateBenefitValue();
    expect(updatedDrugs).toEqual([new Drug("Doliprane", -1, 0)]);
  });

  it("should increase the benefit for Herbal Tea if it's under the max benefit", () => {
    const pharmacy = new Pharmacy([
      new Drug(specificDrugNames.herbalTea, 5, 20),
    ]);
    const updatedDrugs = pharmacy.updateBenefitValue();
    expect(updatedDrugs).toEqual([
      new Drug(specificDrugNames.herbalTea, 4, 21),
    ]);
  });

  it("should double increase Herbal Tea benefit after expiration", () => {
    const pharmacy = new Pharmacy([
      new Drug(specificDrugNames.herbalTea, 0, 20),
    ]);
    const updatedDrugs = pharmacy.updateBenefitValue();
    expect(updatedDrugs).toEqual([
      new Drug(specificDrugNames.herbalTea, -1, 22),
    ]);
  });

  it("should not exceed max benefit for Herbal Tea even after expiration date", () => {
    const pharmacy = new Pharmacy([
      new Drug(specificDrugNames.herbalTea, 0, 49),
    ]);
    const updatedDrugs = pharmacy.updateBenefitValue();
    expect(updatedDrugs).toEqual([
      new Drug(specificDrugNames.herbalTea, -1, BENEFIT_MAX),
    ]);
  });

  it("should increase the benefit for Fervex if it's under the max benefit", () => {
    const pharmacy = new Pharmacy([new Drug(specificDrugNames.fervex, 14, 20)]);
    const updatedDrugs = pharmacy.updateBenefitValue();
    expect(updatedDrugs).toEqual([new Drug(specificDrugNames.fervex, 13, 21)]);
  });

  it("should double the benefit for Fervex if expiresIn < 11", () => {
    const pharmacy = new Pharmacy([new Drug(specificDrugNames.fervex, 10, 20)]);
    const updatedDrugs = pharmacy.updateBenefitValue();
    expect(updatedDrugs).toEqual([new Drug(specificDrugNames.fervex, 9, 22)]);
  });

  it("should triple the benefit for Fervex if expiresIn < 6", () => {
    const pharmacy = new Pharmacy([new Drug(specificDrugNames.fervex, 5, 20)]);
    const updatedDrugs = pharmacy.updateBenefitValue();
    expect(updatedDrugs).toEqual([new Drug(specificDrugNames.fervex, 4, 23)]);
  });

  it("should not exceed max benefit for Fervex even near the expiration date", () => {
    const pharmacy = new Pharmacy([new Drug(specificDrugNames.fervex, 3, 49)]);
    const updatedDrugs = pharmacy.updateBenefitValue();
    expect(updatedDrugs).toEqual([
      new Drug(specificDrugNames.fervex, 2, BENEFIT_MAX),
    ]);
  });

  it("should set Fervex benefit to 0 after expiration", () => {
    const pharmacy = new Pharmacy([new Drug(specificDrugNames.fervex, 0, 30)]);
    const updatedDrugs = pharmacy.updateBenefitValue();
    expect(updatedDrugs).toEqual([
      new Drug(specificDrugNames.fervex, -1, BENEFIT_MIN),
    ]);
  });

  it("should not update benefit and expiresIn for Magic Pills", () => {
    const pharmacy = new Pharmacy([
      new Drug(specificDrugNames.magicPills, 10, 20),
    ]);
    const updatedDrugs = pharmacy.updateBenefitValue();
    expect(updatedDrugs).toEqual([
      new Drug(specificDrugNames.magicPills, 10, 20),
    ]);
  });

  it("should double decrease Dafalgan benefit", () => {
    const pharmacy = new Pharmacy([
      new Drug(specificDrugNames.dafalgan, 10, 30),
    ]);
    const updatedDrugs = pharmacy.updateBenefitValue();
    expect(updatedDrugs).toEqual([new Drug(specificDrugNames.dafalgan, 9, 28)]);
  });

  it("should handle multiple drugs correctly", () => {
    const drugs = [
      new Drug("Doliprane", 2, 10),
      new Drug(specificDrugNames.herbalTea, 5, 20),
      new Drug(specificDrugNames.fervex, 10, 30),
      new Drug(specificDrugNames.magicPills, 4, 7),
      new Drug(specificDrugNames.dafalgan, 10, 25),
    ];
    const pharmacy = new Pharmacy(drugs);
    const updatedDrugs = pharmacy.updateBenefitValue();

    expect(updatedDrugs).toEqual([
      new Drug("Doliprane", 1, 9),
      new Drug(specificDrugNames.herbalTea, 4, 21),
      new Drug(specificDrugNames.fervex, 9, 32),
      new Drug(specificDrugNames.magicPills, 4, 7),
      new Drug(specificDrugNames.dafalgan, 9, 23),
    ]);
  });
});
