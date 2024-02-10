<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <!-- Identity template to copy elements as is -->
  <xsl:template match="node() | @*">
    <xsl:copy>
      <xsl:apply-templates select="node() | @*"/>
    </xsl:copy>
  </xsl:template>

  <!-- Template to handle date elements -->
  <xsl:template match="*[contains(local-name(), 'Date') or contains(local-name(), 'date') or contains(local-name(), 'Time')  or contains(local-name(), 'time') or contains(local-name(), 'expiration') or contains(local-name(), 'signupDate')]">
    <xsl:copy>
      <xsl:apply-templates select="@*"/>
      <xsl:call-template name="convertDate">
        <xsl:with-param name="dateString" select="normalize-space(text())"/>
      </xsl:call-template>
    </xsl:copy>
  </xsl:template>

  <!-- Template to convert date to ISO 8601 format -->
  <xsl:template name="convertDate">
    <xsl:param name="dateString"/>
    <xsl:variable name="formattedDate">
      <xsl:value-of select="normalize-space(substring($dateString, 7, 4))"/>
      <xsl:value-of select="normalize-space(concat('-', substring($dateString, 1, 2)))"/>
      <xsl:value-of select="normalize-space(concat('-', substring($dateString, 4, 2)))"/>
      <xsl:value-of select="normalize-space(concat('T', substring($dateString, 12, 8)))"/>
      <xsl:text>.000Z</xsl:text>
    </xsl:variable>
    <xsl:value-of select="$formattedDate"/>
  </xsl:template>

</xsl:stylesheet>