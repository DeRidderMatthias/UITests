// Generated by Selenium IDE
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Remote;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium.Interactions;
using NUnit.Framework;
using System.IO;

[TestFixture]
public class UserTestsTest {
  private IWebDriver driver;
  public IDictionary<string, object> vars {get; private set;}
  private IJavaScriptExecutor js;
  [SetUp]
  public void SetUp() {
    string solution_dir = Path.GetDirectoryName(Path.GetDirectoryName(TestContext.CurrentContext.TestDirectory));
    driver = new ChromeDriver(solution_dir);
    js = (IJavaScriptExecutor)driver;
    vars = new Dictionary<string, object>();
  }
  [TearDown]
  protected void TearDown() {
    driver.Quit();
  }
  [Test]
  public void canchangerole() {
    driver.Navigate().GoToUrl("https://localhost:5001/Login");
    driver.FindElement(By.CssSelector("form#account input[type=\"email\"]")).SendKeys("AdminMail");
    driver.FindElement(By.CssSelector("form#account input[type=\"password\"]")).SendKeys("AdminPass");
    driver.FindElement(By.CssSelector("form#account button[type=\"submit\"]:not([form])")).Click();
    driver.FindElement(By.CssSelector("a[href=\"/Home/Users\"]")).Click();
    driver.FindElement(By.XPath("//tr[contains(., \"ConsulentMail\")]//a[contains(@class, \"btn-outline-danger\")]")).Click();
    {
      var elements = driver.FindElements(By.XPath("(//table[contains(@class, \"usertable\")])[2]//tr[contains(., \"ConsulentMail\")]"));
      Assert.True(elements.Count == 0);
    }
    {
      var dropdown = driver.FindElement(By.XPath("//div[contains(@class,\"bootstrap-table\")]//tr[contains(.,\"ConsulentMail\")]//select[@name=\"u.Rol\"]"));
      dropdown.FindElement(By.XPath("//option[. = 'Landbouwer']")).Click();
    }
    driver.FindElement(By.XPath("//div[contains(@class,\"bootstrap-table\")]//tr[contains(.,\"ConsulentMail\")]//a[contains(@class,\"btn-success\")]")).Click();
    Assert.That(driver.FindElement(By.XPath("//tr[contains(.,\'ConsulentMail\')]//td[5]")).Text, Is.EqualTo("Landbouwer"));
    driver.FindElement(By.XPath("//tr[contains(., \"ConsulentMail\")]//a[contains(@class, \"btn-outline-danger\")]")).Click();
    {
      var elements = driver.FindElements(By.XPath("(//table[contains(@class, \"usertable\")])[2]//tr[contains(., \"ConsulentMail\")]"));
      Assert.True(elements.Count == 0);
    }
    {
      var dropdown = driver.FindElement(By.XPath("//div[contains(@class,\"bootstrap-table\")]//tr[contains(.,\"ConsulentMail\")]//select[@name=\"u.Rol\"]"));
      dropdown.FindElement(By.XPath("//option[. = 'Consulent']")).Click();
    }
    driver.FindElement(By.XPath("//div[contains(@class,\"bootstrap-table\")]//tr[contains(.,\"ConsulentMail\")]//a[contains(@class,\"btn-success\")]")).Click();
    Assert.That(driver.FindElement(By.XPath("//tr[contains(.,\'ConsulentMail\')]//td[5]")).Text, Is.EqualTo("Consulent"));
  }
  [Test]
  public void canchangeorg() {
    driver.Navigate().GoToUrl("https://localhost:5001/Login");
    driver.FindElement(By.CssSelector("form#account input[type=\"email\"]")).SendKeys("AdminMail");
    driver.FindElement(By.CssSelector("form#account input[type=\"password\"]")).SendKeys("AdminPass");
    driver.FindElement(By.CssSelector("form#account button[type=\"submit\"]:not([form])")).Click();
    driver.FindElement(By.CssSelector("a[href=\"/Home/Users\"]")).Click();
    driver.FindElement(By.XPath("//tr[contains(., \"ConsulentMail\")]//a[@class=\"detail-icon\"]")).Click();
    {
      var dropdown = driver.FindElement(By.Name("Organisatie"));
      dropdown.FindElement(By.XPath("//option[. = 'Innovatiesteunpunt']")).Click();
    }
    driver.FindElement(By.CssSelector(".btn:nth-child(7)")).Click();
    Assert.That(driver.FindElement(By.XPath("//tr[contains(., \"ConsulentMail\")]//td[4]")).Text, Is.EqualTo("Innovatiesteunpunt"));
    driver.FindElement(By.XPath("//tr[contains(., \"ConsulentMail\")]//a[@class=\"detail-icon\"]")).Click();
    {
      var dropdown = driver.FindElement(By.Name("Organisatie"));
      dropdown.FindElement(By.XPath("//option[. = 'ILVO']")).Click();
    }
    driver.FindElement(By.CssSelector(".btn:nth-child(7)")).Click();
    Assert.That(driver.FindElement(By.XPath("//tr[contains(., \"ConsulentMail\")]//td[4]")).Text, Is.EqualTo("ILVO"));
  }
}
