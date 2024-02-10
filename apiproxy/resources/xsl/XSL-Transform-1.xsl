<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
  <!-- Identity template to copy elements as is -->
  <xsl:template match="node() | @*">
    <xsl:copy>
      <xsl:apply-templates select="node() | @*"/>
    </xsl:copy>
  </xsl:template>

  <!-- Template to handle phone elements -->
  <xsl:template match="*[contains(local-name(), 'Phone') and not(starts-with(local-name(), 'phone'))]">
    <xsl:copy>
      <countryCode></countryCode>
      <subscriberNumber>
        <xsl:value-of select="."/>
      </subscriberNumber>
    </xsl:copy>
  </xsl:template>

  <!-- Template to change <dayPhone> to <workPhone> -->
  <!--<xsl:template match="dayPhone">-->
  <!--  <workPhone>-->
  <!--    <countryCode></countryCode>-->
  <!--    <subscriberNumber>-->
  <!--      <xsl:value-of select="."/>-->
  <!--    </subscriberNumber>-->
  <!--  </workPhone>-->
  <!--</xsl:template>-->
  
  <!-- Template to change <evenPhone> to <contactPhone> -->
  <!--<xsl:template match="evenPhone">-->
  <!--  <contactPhone>-->
  <!--    <countryCode></countryCode>-->
  <!--    <subscriberNumber>-->
  <!--      <xsl:value-of select="."/>-->
  <!--    </subscriberNumber>-->
  <!--  </contactPhone>-->
  <!--</xsl:template>-->

</xsl:stylesheet>
