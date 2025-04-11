export const specificDrugNames = {
  herbalTea: "Herbal Tea",
  fervex: "Fervex",
  magicPills: "Magic Pill",
  dafalgan: "Dafalgan",
};

export const EXPIRED_DATE = 0;
export const BENEFIT_MAX = 50;
export const BENEFIT_MIN = 0;
export const FERVEX_DOUBLE_INCREASE_DATE = 11;
export const FERVEX_TRIPLE_INCREASE_DATE = 6;

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  increaseBenefit(drug) {
    drug.benefit++;
  }

  decreaseBenefit(drug) {
    drug.benefit--;
  }

  isNotMaxBenefit(drug) {
    return drug.benefit < BENEFIT_MAX;
  }

  isNotMinBenefit(drug) {
    return drug.benefit > BENEFIT_MIN;
  }

  isHerbalTea(drug) {
    return drug.name === specificDrugNames.herbalTea;
  }

  isFervex(drug) {
    return drug.name === specificDrugNames.fervex;
  }

  isMagicPills(drug) {
    return drug.name === specificDrugNames.magicPills;
  }

  isDafalgan(drug) {
    return drug.name === specificDrugNames.dafalgan;
  }

  updateBenefitValue() {
    for (let i = 0; i < this.drugs.length; i++) {
      const drug = this.drugs[i];
      this.handleUpdateBenefit(drug);

      if (!this.isMagicPills(drug)) {
        drug.expiresIn--;
      }

      if (drug.expiresIn < EXPIRED_DATE) {
        this.handleExpired(drug);
      }
    }

    return this.drugs;
  }

  handleUpdateBenefit(drug) {
    if (this.isHerbalTea(drug) || this.isFervex(drug)) {
      this.increaseDrugBenefit(drug);
    } else {
      this.decreaseDrugBenefit(drug);
      if (this.isDafalgan(drug)) {
        this.decreaseDrugBenefit(drug);
      }
    }
  }

  decreaseDrugBenefit(drug) {
    if (this.isNotMinBenefit(drug) && !this.isMagicPills(drug)) {
      this.decreaseBenefit(drug);
    }
  }

  increaseDrugBenefit(drug) {
    if (this.isNotMaxBenefit(drug)) {
      this.increaseBenefit(drug);

      if (this.isFervex(drug)) {
        if (
          drug.expiresIn < FERVEX_DOUBLE_INCREASE_DATE &&
          this.isNotMaxBenefit(drug)
        ) {
          this.increaseBenefit(drug);
        }
        if (
          drug.expiresIn < FERVEX_TRIPLE_INCREASE_DATE &&
          this.isNotMaxBenefit(drug)
        ) {
          this.increaseBenefit(drug);
        }
      }
    }
  }

  handleExpired(drug) {
    if (this.isHerbalTea(drug)) {
      if (this.isNotMaxBenefit(drug)) {
        this.increaseBenefit(drug);
      }
    } else if (this.isFervex(drug)) {
      drug.benefit = BENEFIT_MIN;
    } else {
      if (this.isNotMinBenefit(drug) && !this.isMagicPills(drug)) {
        this.decreaseBenefit(drug);
      }
    }
  }
}
