const data = require("../support/data/test-week4-data");
const locator = require("../support/locator/test-week4-locator");

describe("Koligrum web playground", () => {
  context("Open website and check the dropdown", () => {
    it("verify the number of value is correct", () => {
      cy.visit("");
      cy.get(locator.selector.dropdown).then(($totalList) => {
        expect($totalList).to.have.length(5);
      });
    });

    it("Verify the all the value of dropdown", () => {
      const colorList = data.datatest.color_list;
      for(let i = 0; i < colorList.length; i++) {
        cy.get(locator.selector.dropdown).should(($orderList) => {
          expect($orderList.eq(i)).to.contain(colorList[i]);
        });
      };
    });
  });

  context("Create test to input at least 3 quote with different color", () => {
    it("Verify that the number of quotes are correct (Grid View)", () => {
      //create input
      for(let i = 0; i < data.datatest.quote_list.length; i++) {
        cy.get(locator.selector.textarea).type(data.datatest.quote_list[i]);
        for(let j = 0; j < data.datatest.color_list.length; j++) {
          cy.get(locator.selector.select_color).select(data.datatest.color_list[i]);
        };
        cy.get(locator.selector.button_addQuote).click();
      };
      //verify the number of quotes
      cy.get(locator.selector.container_quote).then(($sumContainer) => {
        expect($sumContainer).to.have.lengthOf(data.datatest.quote_list.length+1);
      });      
    });

    it("Verify the quotes you inserted are correct (Grid View)", () => {
      let quotes = data.datatest.quote_list;
      for(let i = 0; i < quotes.length; i++) {
        cy.get(locator.selector.inserted_quote).should(($quote) => {
          expect($quote.eq(i+1)).to.contain(quotes[i]);
        });
      };
    });

    it("Verify the table is exist (Table View)", () => {
      cy.get(locator.selector.tab_table_view).click();
      cy.get(locator.selector.button_show_table).click();
      cy.get(locator.selector.table_quote).should("be.visible");
    });

    it("Verify the data in the table is correct", () => {

      // quote default + inserted quote
      let arr1 = ["You Can do it!!!"]; 
      let arr2 = data.datatest.quote_list;
      let list_arr = arr1.concat(arr2);
      // verify quote
      for(let i = 0; i < list_arr.length; i++) {
        cy.get(locator.selector.table_column_quote).should($quote_data => {
          expect($quote_data.eq(i)).to.contain(list_arr[i]);
        });
      };

      // color default + selected color
      let color1 = ["white"];
      let color2 = data.datatest.color_list;
      let color_arr = color1.concat(color2);

      //verify color
      for(let i = 0; i < color_arr.length; i++) {
        cy.get(locator.selector.table_column_color).should($color_data => {
          expect($color_data.eq(i)).to.contain(color_arr[i]);
        });
      };
    });
  });
});