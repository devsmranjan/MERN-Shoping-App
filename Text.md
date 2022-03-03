# Introduction
APOC aims to be a one-stop solution for clients looking for an invoice digitization software.
It tries to achieve so by providing an infinitely customizable platform with a default settings profile.
The default settings profile means, the clients are ready to use the platform post registration (with a zero need for additional settings to evaluate the software).

Though many of the basic settings and configurations are provided in the UI. It also, employs pf4j plugins at its core to provide the clients a complete control over their custom needs.

# Plugin Flow

First and Foremost , 

###  Platform Admin -> 
 Platform Admin plays the role to **Onboard the Plugin** on the Platform . For an AP admin to basically enjoy the features that he asks or demands. Plugin is the best way to provide the customizable(enable/disable/configurable) feature to them .

![Basic Plugin Flow](https://infygithub.ad.infosys.com/apoc/onboarding-service/blob/master/final_Plugin.drawio.png)

  The steps needed by Platform Admin to onboard the plugin for specific OU's are as follows.

1 . **Uploading the plugin**  ->  A zip file of the plugin needs to be uploaded .While Uploading , its needed to specify the configuration 
                                 parameters for the Plugin on basis of requirement made by any tenant. Thereafter, once the plugin zip is uploaded, it will be stored in the volume . 
                              Once the plugin is stored and extracted, the database is being feed with plugin path and details followed by deletion of particular zip.

2 .  **Virus Scan** -> After Plugin reach to the Volume ,  Plugin goes for verification (Virus Scan) . A message triggered to the 
    Service or Util to do the virus scans or other security checks to protect the platform from malicious attack. 
   
   Important Things
     
       Q   Where can Platform Admin get the Plugin? 
      Ans   It's a feature that we are providing to tenant based on it's demand , bussiness requirement or preferences . so Either It can be shared by        
            AP admin created by their team  or APOC(Infosys) Developer can write the plugin and provide it to platform Admin as a customizable feature 
            for Tenants. 
              It's AP admin wish to basically enable or disable the respective plugin
    
      Q   Are Plugins available in each plan ? 
      Ans  Yes , It is , but It can be on plans basis also .

  
3 . **Verification/Testing of Plugin** - Once the virus scan is done . The event triggered to the services and Based on Plugin Type, Respective
                         service is going to perform the verification . Verification means to say  

      1.  Running the Test Cases.

      2.  Checking the compatibility of the Plugin, extension point and plugin id

      3.  Verifying whether the plugin is valid or Invalid .
                              
4 . **Publishing the Plugin** ->  Only if the plugin is valid , then Platform can publish the plugin by choosing 
        Tenant or Ou's. Publishing means It is visible for that particular OU or Tenant . It's the tenant wish to enable and disable the respective 
        Plugin and configure the parameters value.

###  AP Admin ->   
 After login to the portal , He can enable/disable the Plugin by just Clicking on the Configuration Tab on left Side and then click on the 
          plugin tab .

**Note** * Plugin Tab will only be visible if Platform Admin has published the plugin for him .

Plugin by default is in disabled state , He can directly enable the plugin or can specify the Plugin Param and then enable .
    Once the Plugin get successfully enabled . The default behaviour gets overridden . 
 

Plugins enable the clients to bring their business requirements and personal preferences into the system.
The platform exposes the following extension points to the clients for the same:

###  Future Scope(Features yet to be introduced)

1 . Virus Scan for Plugin needs to be added .

2 . In case AP admin Team will create the plugin , the skeleton and the documentation with the extension point needs to be exposed 

3 . In case of failure in one of the POD , Proper consistency needs to be maintained in all 

4 . Some new plugin which we need to onboard on our Platform

5 . Some telemetry related to Plugins if required
